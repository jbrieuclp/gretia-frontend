function OFSAMap(map, arg){

	//verification qu'un objet map est transmi
	if ( map instanceof ol.Map === false )
		throw new Error("le premier argument de OFSAMap doit être un objet ol.Map");
	
	var map = map;

	var that = this;

	//projection des couches : EPSG: 3857
	var projection = new ol.proj.get('EPSG:3857');

	//format des couches : geojSon
	var format = new ol.format.GeoJSON({projection: projection});

	//liste des layers chargés
	var ofsaLayers = {};

	//légende à afficher
	var displayLegend = {};

	//stocke les requete ajax en cours pour les supprimer si rechargement
	var xhr = {};

	// on définit les paramètres et leurs valeurs par défaut
	var param = {
		//selecteur de la cible pour afficher la légende
        legendTarget : '#legende',
        //selecteur ou un event est deployé pour recharger les couches affichées
        reloadSelector : '[data-form="fmr-indicateur"]',
        //selecteur ou un event est deployé pour afficher une couche
        layerSelector : 'data-layer'
    }; 

    // on fusionne l'argument et l'objet, arg va ecraser param
	param = $.extend(param, arg); 


	//Prototypage
	if( typeof OFSAMap.initialized == "undefined" ) { 

		
		/***
		*	Partie légende
		*/

		/**
		 *	Fonction qui charge une olLayer depuis une configuration particulière
		 *	
		 */
		OFSAMap.prototype.addLayer = function(id, url, arg) {
			if ( id.trim() === "" )
				throw new Error("le premier argument de la fonction addLayer doit être une chaine");

			if ( url.trim() === "" )
				throw new Error("le second argument de la fonction addLayer doit être une url");

			legendInfos = {
				legendJson: {},
				legendSelector: null,
				legendInUse: null,
				style: [new ol.style.Style({ 
							fill: new ol.style.Fill({ color: '#fff'}), 
							stroke: new ol.style.Stroke({color: '#505050', width: 0.5})
						})]
			};

			//gestion des infos légende tranmises
			legendInfos = $.extend(legendInfos, arg.legend); 
			delete arg.legend;

			var layerOptions = {
				id: id, url: url, title: id, queryable: true, legendInfos: legendInfos, visibility: false, displayInLegend: true
			};

			layerOptions = $.extend(layerOptions, arg); 

			var olSource = new ol.source.Vector({format:format});
            var olLayer = new ol.layer.Vector({
                                title: layerOptions.title, 
                                queryable: layerOptions.queryable,
                                url: layerOptions.url,
                                displayInLegend: layerOptions.displayInLegend,
                                source: olSource, 
                                style: function(feature, resolution){
                            		if (typeof(layerOptions.legendInfos.style) == "function") {
                                		return layerOptions.legendInfos.style(feature, resolution, layerOptions.legendInfos.legendInUse);
                                	} else {
                                		return layerOptions.legendInfos.style;
                                	}
                                },
                                visible: layerOptions.visibility
                          });

            //on ajoute la couche à l'objet ol.Map
            //fonction ol.Map.addLayer
            map.addLayer(olLayer);

            //on ajouter la couche dans le catalogue ofsaLayers
            ofsaLayers[id] = {
            	olSource: olSource,
            	olLayer: olLayer,
            	legendInfos: legendInfos
            };

            //on tente de charger la couche.
            this.reloadLayer(id);

            return;
		};

		/**
		 *	Fonction qui charge une olLayer depuis une configuration particulière
		 *	
		 */
		OFSAMap.prototype.removeLayer = function(id) {
			if ( id.trim() === "" )
				throw new Error("le premier argument de la fonction addLayer doit être une chaine");

			var ofsaLayer = this.getLayer(id);

			map.removeLayer(ofsaLayer.olLayer);
            delete ofsaLayers[id];
            delete displayLegend[id];
            this.drawLegend();

            return;
		};

		/**
		 *	Fonction qui transmet une ofsaLayer à partir de son id
		 *	
		 */
		OFSAMap.prototype.getLayer = function(id) {
			if ( id.trim() === "" )
				throw new Error("le premier argument de la fonction getLayer doit être une chaine");

            //retourne la couche présente dans le catalogue ofsaLayers
            return ofsaLayers[id];
		};

		/**
		 *	Fonction qui charge les données d'une ofsaLayer à partir de son id
		 *	
		 */
		OFSAMap.prototype.reloadLayer = function(id) {
			if ( id.trim() === "" )
				throw new Error("le premier argument de la fonction reloadLayer doit être une chaine");

			var ofsaLayer = this.getLayer(id);

			//si la couche est visible on lance la fonction qui charge les données
            if ( ofsaLayer.olLayer.get('visible') ) {
            	//ajax qui recupère les données
            	if ( typeof(xhr[id]) !== "undefined") {
            		xhr[id].abort();
            		delete xhr[id];
            	}

                xhr[id] = $.ajax({
		                    url: ofsaLayer.olLayer.get('url'),
		                    method: 'POST',
		                    data: $(param.reloadSelector).serializeArray(),
		                    beforeSend: function() {
		                        $("#load-maplayer").removeClass('hide');
		                        ofsaLayer.olSource.clear();
		                    },
		                    success: function(data) {
		                        ofsaLayer.olSource.clear();
		                        ofsaLayer.olSource.addFeatures(format.readFeatures(data));
		                        $("#load-maplayer").addClass('hide');
		                        //me.setLegend(layer);

		                        delete xhr[id];
		                    },
		                    error: function(){
		                        $("#load-maplayer").addClass('hide');
		                        delete xhr[id];
		                    }
		                }); 

                //si la couche est visible on demande la creation de la légende
                this.addLegendLayer(id);
            }

            //retourne la couche présente dans le catalogue ofsaLayers
            return;
		};

		/**
		 *	Fonction qui recharge l'ensemble des couches activé = visible: true
		 *	
		 */
		OFSAMap.prototype.reloadActiveLayer = function() {
			for (var id in ofsaLayers) {
				var ofsaLayer = ofsaLayers[id];
                if ( ofsaLayer.olLayer.getVisible() ) {
                    this.reloadLayer(id);
                }
            }
		}

		/**
		 *	Fonction qui charge les données d'une ofsaLayer à partir de son id
		 *	
		 */
		OFSAMap.prototype.refreshLayer = function(id) {
			if ( id.trim() === "" )
				throw new Error("le premier argument de la fonction reloadLayer doit être une chaine");

			var ofsaLayer = this.getLayer(id);

			//si la couche est visible on lance la fonction qui charge les données
            if ( ofsaLayer.olLayer.get('visible') ) {
            	//ajax qui recupère les données
            	if ( typeof(xhr[id]) !== "undefined") {
            		xhr[id].abort();
            		delete xhr[id];
            	}

                xhr[id] = $.ajax({
		                    url: ofsaLayer.olLayer.get('url'),
		                    method: 'POST',
		                    data: $(param.reloadSelector).serializeArray(),
		                    success: function(data) {
		                        ofsaLayer.olSource.clear();
		                        ofsaLayer.olSource.addFeatures(format.readFeatures(data));
		                        delete xhr[id];
		                    },
		                    error: function(){
		                        delete xhr[id];
		                    }
		                }); 

                //si la couche est visible on demande la creation de la légende
                this.addLegendLayer(id);
            }

            //retourne la couche présente dans le catalogue ofsaLayers
            return;
		};

		/**
		 *	Fonction qui recharge l'ensemble des couches activé = visible: true
		 *	
		 */
		OFSAMap.prototype.refreshActiveLayer = function() {
			for (var id in ofsaLayers) {
				var ofsaLayer = ofsaLayers[id];
                if ( ofsaLayer.olLayer.getVisible() ) {
                    this.refreshLayer(id);
                }
            }
		}

		/***
		*	Fin Partie Layer
		*/


		/***
		*	Partie légende
		*/

		/**
		 *	Fonction qui charge la légende d'une couche à partir de son id
		 *	
		 */
		OFSAMap.prototype.addLegendLayer = function(id) {
			if ( id.trim() === "" )
				throw new Error("le premier argument de la fonction setStyleInUse doit être une chaine");

			//on applique le style en cours
			this.setStyleInUse(id);
			var ofsaLayer = this.getLayer(id);

			displayLegend[id] = ofsaLayer.olLayer.get('displayInLegend');

			this.drawLegend();

			return;
		}

		/**
		 *	Fonction qui charge la légende d'une couche à partir de son id
		 *	
		 */
		OFSAMap.prototype.removeLegendLayer = function(id) {
			if ( id.trim() === "" )
				throw new Error("le premier argument de la fonction setStyleInUse doit être une chaine");

			delete displayLegend[id];
			this.drawLegend();

			return;
		}

		/**
		 *	Fonction qui charge la légende d'une couche à partir de son id
		 *	
		 */
		OFSAMap.prototype.getLegendTemplate = function(id) {
			if ( id.trim() === "" )
				throw new Error("le premier argument de la fonction getLegendTemplate doit être une chaine");

			var ofsaLayer = this.getLayer(id);

			var $conteneurGlobal = $('<div>');
            var $titreDiv = $('<div>');
            var $bodyDiv = $('<div class="legend-body">');

            //mise en forme du titre et des boutons d'interractions
            var $removeSpan = $('<span>').addClass('glyphicon glyphicon-remove')
                                         .attr('title', 'Enlever la couche')
                                         .click(function(){
                                            ofsaLayer.olLayer.setVisible(false);
                                            $conteneurGlobal.remove();
                                            delete displayLegend[id];
                                         });
            var $displaySpan = $('<span>').addClass('glyphicon glyphicon-eye-open')
                                          .attr('title', 'Afficher/masquer la couche')
                                          .on('click', function(){
                                            //si la couche est affichée, on la masque
                                            if (ofsaLayer.olLayer.getVisible()) {
                                                ofsaLayer.olLayer.setVisible(false);
                                                $bodyDiv.slideToggle();
                                                $(this).toggleClass('glyphicon-eye-open glyphicon-eye-close');
                                            } else {
                                                ofsaLayer.olLayer.setVisible(true);
                                                $bodyDiv.slideToggle();
                                                $(this).toggleClass('glyphicon-eye-close glyphicon-eye-open');
                                            }
                                         });
            var $titreSpan = $('<span>').addClass('titre').html(ofsaLayer.olLayer.get('title'));
            //on ajoute nos élément d'entete à la div globale
            $titreDiv.append($removeSpan).append($displaySpan).append($titreSpan)

            //mise en forme de la légende
            //on recupère le styleInUse 
            var styleInUse = ofsaLayer.legendInfos.legendInUse;

            var typeSemio = null;
            //on test le type de classif
            if ( Array.isArray(styleInUse) ) {
            	for (i = 0 ; i < styleInUse.length ; i++) {
	            	var $div = $('<div>');
	                var $bloc = $('<span class="couleur" style="background-color:'+styleInUse[i]['color']+';">');
	                var $label = $('<span class="libelle">'+styleInUse[i]['label']+'</span>');
	                $div.append($bloc);
                    $div.append($label);
                    //on ajoute nos élément d'entete à la div globale
                    $bodyDiv.append($div);
	           	}
            } else {
            	for (var key in styleInUse){
            		var $div = $('<div>');
                    var $bloc = $('<span class="couleur" style="background-color:'+styleInUse[key]['color']+';">');
                    var $label = $('<span class="libelle">'+styleInUse[key]['label']+'</span>');
                    $div.append($bloc);
                    $div.append($label);
                    //on ajoute nos élément d'entete à la div globale
                    $bodyDiv.append($div);
            	}
            }

            
            //on ajoute la div globale au bloc légende
            $conteneurGlobal.append($titreDiv).append($bodyDiv);
            return $conteneurGlobal;
		}


		/**
		 *	Retourne le json du style à utiliser
		 *	
		 */
		OFSAMap.prototype.setStyleInUse = function(id) {
			if ( id.trim() === "" )
				throw new Error("le premier argument de la fonction setStyleInUse doit être une chaine");

			var ofsaLayer = this.getLayer(id);

			if ( typeof(ofsaLayer.legendInfos.legendSelector) === "function" ) {
				ofsaLayer.legendInfos.legendInUse = ofsaLayer.legendInfos.legendJson[ofsaLayer.legendInfos.legendSelector()];
			} else {
				ofsaLayer.legendInfos.legendInUse = ofsaLayer.legendInfos.legendJson;
			}

		}

		/**
		 *	Fonction qui charge la légende d'une couche à partir de son id
		 *	
		 */
		OFSAMap.prototype.drawLegend = function() {
			$(param.legendTarget).html('');
			for (var legend in displayLegend) {
				if ( displayLegend[legend] ) {
					$(param.legendTarget).append(this.getLegendTemplate(legend));
				}
            }
		}

		/***
		*	Fin Partie légende
		*/



		$(document).on('click', '['+param.layerSelector+']', function(e){
			var idLayer = $(this).attr(param.layerSelector);

			//on verifie si une couche est coché parmi nos selector id = idLayer
			var ofsaLayer = that.getLayer(idLayer);

			//si au moins une case à cocher est cochée
			if ($('['+param.layerSelector+'="'+idLayer+'"]:checked').length) {
				//on affiche la donnée
				ofsaLayer.olLayer.setVisible(true);
				that.reloadLayer(idLayer);
			} else {
				//sinon on la masque et on vide les sources
				ofsaLayer.olLayer.setVisible(false);
				ofsaLayer.olSource.clear();
				that.removeLegendLayer(idLayer);
			}
		});

		/**
		*	Declenche l'action de recharger l'ensemble des couches activées, lors d'un click sur un element de filtre (maille, territoire, date, filtre...)
		**/
		$(document).on('click', param.reloadSelector, function(e){
			if ( typeof($(this).attr('data-target')) !== "undefined" ) {
				var target = $(this).attr('data-target');
				$.each($("[name='"+target+"']"), function(idx, ele) {
					var idLayer = $(ele).attr(param.layerSelector);
					if (typeof(idLayer) !== "undefined")
						that.reloadLayer(idLayer);
				});
			} else {
				that.reloadActiveLayer();
			}
		});

		/**
		*	Necessaire pour annuler laction précédente lors du click sur l'input de date - on veut recharger lorsque le focus quite l'input
		*	On declenche l'action de rechargement lorsque le focus quitte la zone de texte
		**/
        $("#date_min, #date_max").click(function(e){
			e.stopPropagation();
		})
		.focusout(function(e){
			that.reloadActiveLayer();
		});

		OFSAMap.initialized = true; 
	}
};