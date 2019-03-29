$(function(){
	"use strict"

	$(".select2").select2({
        placeholder: $(this).attr("placeholder"),
        allowClear: true,
        closeOnSelect:true,
    });

	var DEPARTEMENTS = [
	    {
	        id: '',
	        text: 'Aquitaine',
	        children: [
	            { id: '24', text: 'Dordogne (24)' },
	            { id: '33', text: 'Gironde (33)' },
	            { id: '40', text: 'Landes (40)' },
	            { id: '47', text: 'Lot-et-Garonne (47)' },
	            { id: '64', text: 'Pyrénées-Atlantiques (64)' }
	        ]
	    },
	    {
	        id: '',
	        text: 'Limousin',
	        children: [
	            { id: '19', text: 'Corrèze (19)' },
	            { id: '23', text: 'Creuse (23)' },
	            { id: '87', text: 'Haute-Vienne (87)' }
	        ]
	    },
	    {
	        id: '',
	        text: 'Poitou-Charentes',
	        children: [
	            { id: '16', text: 'Charente (16)' },
	            { id: '17', text: 'Charente-Maritime (17)' },
	            { id: '79', text: 'Deux-Sèvres (79)' },
	            { id: '86', text: 'Vienne (86)' }
	        ]
	    }
	];

	

	var NOTES = [
	    {
	        id: '',
	        text: 'Manuel',
	        children: [
	            { id: '0', text: 'En attente de validation' },
	            { id: '1', text: 'Invalidé' },
	            { id: '2', text: 'Invalidé provisoirement' },
	            { id: '3', text: 'Validé provisoirement' },
	            { id: '4', text: 'Validé' },
	            { id: '5', text: 'Exotique, horticole, non présent dans Taxref' }
	        ]
	    },
	    {
	        id: '',
	        text: 'Automatique',
	        children: [
	            { id: '11', text: 'Invalidé (automatique)' },
	            { id: '12', text: 'Invalidé provisoirement (automatique)' },
	            { id: '13', text: 'Validé provisoirement (automatique)' },
	            { id: '14', text: 'Validé (automatique)' }
	        ]
	    }
	];

	var PROTECT = [
	    {
	        id: '',
	        text: 'Toutes protections',
	        children: [
	            { id: 'prot_nat_art1', text: 'Protection nationale Art. 1' },
				{ id: 'prot_nat_art2', text: 'Protection nationale Art. 2' },
				{ id: 'prot_reg_aq', text: 'Protection régionale Aquitaine' },
				{ id: 'prot_reg_pc', text: 'Protection régionale Poitou-Charentes' },
				{ id: 'prot_dept_24', text: 'Protection départementale 24' },
				{ id: 'prot_dept_33', text: 'Protection départementale 33' },
				{ id: 'prot_dept_40', text: 'Protection départementale 40' },
				{ id: 'prot_dept_47', text: 'Protection départementale 47' },
				{ id: 'prot_dept_64', text: 'Protection départementale 64' },
				{ id: 'prot_dept_86', text: 'Protection départementale 86' }
	        ]
	    }
	];

	var TYPERELEVE = [
	    {
	        id: '',
	        text: 'Tout type de releve',
	        children: [
	            { id: '6', text: 'Floristique' },
				{ id: '10', text: 'Fiche station d espèce à enjeu' },
				{ id: '11', text: 'Fiche suivi d espèce à enjeu' },
				{ id: '12', text: 'Quadrat simple' },
				{ id: '13', text: 'Quadrat en transect' },
				{ id: '14', text: 'Phytosociologie simple' },
				{ id: '15', text: 'Phytosociologie en transect' },
				{ id: '16', text: 'Relevé synthétique (phyto)' },
				{ id: '17', text: 'Phytosociologie sigmatiste' },
				{ id: '18', text: 'Phytosociologie synusiale' },
				{ id: '19', text: 'Phytosociologie de suivi' },
				{ id: '20', text: 'Aucun' }
	        ]
	    }
	];

	var initMultiple = function(e, data){
		$(e).select2({
		    multiple: true,
		    placeholder: $(this).attr("placeholder"),
		    data: data
		}).on('select2-selecting', function(e) {
		    var $select = $(this);
		    if (e.val == '') {
		        e.preventDefault();
		        var childIds = $.map(e.object.children, function(child) {
		            return child.id;
		        });
		        $select.select2('val', $select.select2('val').concat(childIds));
		        $select.select2('close');
		    }
		});
	}

	initMultiple('#liste_departement', DEPARTEMENTS);
	initMultiple('#liste_note', NOTES);
	initMultiple('#liste_protection', PROTECT);
	initMultiple('#liste_type', TYPERELEVE);


    $(document).on("click", ".close-arrow", function(){
		$(".bloc-resultat").remove();
	});

	$('.datepickers').datetimepicker({
        format: 'DD/MM/YYYY',
        locale: moment.locale('fr'),
        maxDate: new Date()
    });

	/**
	* Gestion de la liste déroulante des communes (filtre pas carto)
	**/
	/*******************************************************************/  
  /*********************** Zoom sur commune **************************/
  /*******************************************************************/

    var xhr_liste_commune;

    $('#zt_commune').typeahead({
        hint: false,
        highlight: true,
        minLength: 3
    },
    {
        name: 'communes',
        limit: Infinity, // Attention ici, bug de l'API. Si on met une limite et que le nombre de résultats est inférieur à cette limite, seule le premier résultat sera retourné... Solution trouvée : Infinity ici, et c'est le serveur qui limite le nombre de réponse
        async: true,
        display: function(suggestion) {
            return suggestion.label
        },
        // source des résultats. Dans notre cas, AJAX donc on renvoie la variable asyncResults 
        source: function ( query, syncResults, asyncResults ) {

            if( typeof(xhr_liste_commune) !== 'undefined' ) {
                xhr_liste_commune.abort();
            }
            
            xhr_liste_commune = $.ajax({
                url: Routing.generate('ofsa_referentiel_commune_autocomplete') + '/' + query,
                dataType: 'json'
            }).success( function(data) {
                // c'est la façon de procéder... on obéit //
                asyncResults( data );
            });
        },
        // modifie le template d'un item de liste //
        templates: {
            suggestion: function (data) {
            return '<div data-id="'+ data.insee_com +'" class="tt-suggestion tt-selectable">'+ data.label + '</div>';
       
        },
        pending: '<div class="loading load1"></div>'
        }
    });
   
    // modifie le comportement lors d'un select de l'item //
    var nb_Communes = $("div#lst_commune").find('span.blc-communes').length;
    $('#zt_commune').bind('typeahead:selected', function(ev, suggestion) {

        // Affiche le nom de la commune dans le champ d'autocomplétion
        $(this).typeahead('val', "");
        
        var $container = $('div#tpl-commune');
        var id = "", name = "", prototype;

		var $prototype = $($container.attr('data-prototype')
								.replace(/__INDEX__/g, nb_Communes)
								.replace(/__CODE_COMM__/g, suggestion.insee_comm)
								.replace(/__NOM_COMM__/g, suggestion.label));

        $("div#lst_commune").append($prototype);
        nb_Communes++;
		$("#zt_commune").focus();            
    });





    /**
	* Gestion de la liste deroulante des taxons
	*/
	//input de recherche d'un taxon et d'affichage de sa fiche espece
    $('#zt_taxon').OPNATypehead({
        target: '.results-taxon-complete',
        minChar: 2,
        url: Routing.generate('ofsa_taxon_html') + '?term=',
        elementSelector: "#liste-flore p:not('.nom_vern')",
        onSelect: function(e){
        	var $container = $('div#tpl-taxon');
	        var index = $("div#lst_taxon").find('span.blc-taxon').length;
	        var id = "", name = "", prototype;

			var $prototype = $($container.attr('data-prototype')
									.replace(/__INDEX__/g, index)
									.replace(/__CD_NOM__/g, e.parent('li').attr('data-cd'))
									.replace(/__CD_REF__/g, e.parents('li.li-groupe').find('li.li-valide').attr('data-ref'))
									.replace(/__NOM_COMPLET__/g, e.parent('li').attr('data-name')));

	        $("div#lst_taxon").append($prototype);
			$("#zt_taxon").val("");
			$("#zt_taxon").focus();
			$('#taxon_modal .alert').css({'display' : 'block'});
			setTimeout(function(){$("#taxon_modal .alert").fadeOut('200');}, 2000);


			return false;
        },
        onChange: function(e){
        	if ($(this).val() == '') {
				$("#observation_taxon").val('');
				$("#zt_nom_valide").html('Nom valide');
			}
        },
        onHover: function(e) {
        	$("#observation_taxon").val(e.parent('li').attr('data-cd'));
			$("#observation_nom_cite").val(e.parent('li').attr('data-name'));
			$("#zt_nom_valide").html(e.parents('li.li-groupe').find('li.li-valide').attr('data-name'));
        }
    });

	/**
	* FIN Gestion de la liste deroulante des taxons
	*/

    $("#bt_select_syntaxon")
	.click(function() {
		var $container = $('div#template_dbox_syntaxon');
        var $prototype = $($container.attr('data-prototype'));
        $prototype.OFSADBox({width: '400', masque: false});
        loadZTSyntaxon();
    });


    //gestion de la soumission du formulaire si affichage des données : comptage du nombre de donnée
    $("#submit-bt").click(function(event){
    	event.preventDefault();

    	var postData = $("#fmr_consultation").serializeArray();

    	$.ajax({
        	url: Routing.generate('ofsa_consultation_getcount'),
	        method: 'POST',
	        data: postData,
	        beforeSend: function() {
	            $(".alert-waiting").toggleClass('hide');
	        },
	        success: function(data) {
	            $(".alert-waiting").toggleClass('hide');

	            if (data == "0") {
			    	bootbox.alert({ 
						title: "Information du lot",
						message: "Cette selection ne renvoi aucune donnée",
						buttonName : {
							label: "Fermer",
							className: "btn-ofsa",
						}
					});
			    } else {
			    	bootbox.confirm({
			    		title: "Information du lot",
			    		message: "Cette selection va renvoyer "+data+" données", 
			    		buttons: {
					        confirm: {
					            label: 'Confirmer',
					            className: 'btn-ofsa'
					        },
					        cancel: {
					            label: 'Annuler',
					            className: 'btn-default'
					        }
					    },
			    		callback: function(result){
			    			if (result) {
				    			$("#fmr_consultation").submit();
				    		}
				    	}
				    });
			    }
	        },
	        error: function(){
	        	$(".alert-waiting").toggleClass('hide');
	        }
	    });
    });

    //gestion de la soumission du formulaire si extraction basique : comptage du nombre de donnée
    $("#extract-bt").click(function(event){
    	event.preventDefault();

    	var postData = $("#fmr_consultation").serializeArray();

    	$.ajax({
        	url: Routing.generate('ofsa_consultation_getcount'),
	        method: 'POST',
	        data: postData,
	        beforeSend: function() {
	            $(".alert-waiting").toggleClass('hide');
	        },
	        success: function(data) {
	            $(".alert-waiting").toggleClass('hide');

			    if (data == "0") {
			    	bootbox.alert({ 
						size: "large",
						title: "Information du lot",
						message: "Cette selection ne renvoi aucune donnée",
						buttonName : {
							label: "Fermer",
							className: "btn-ofsa",
						}
					});
			    } else {
			    	bootbox.confirm({
			    		size: "large",
			    		title: "Information du lot",
			    		message: "Cette selection va renvoyer "+data+" données", 
			    		buttons: {
					        confirm: {
					            label: 'Confirmer',
					            className: 'btn-ofsa'
					        },
					        cancel: {
					            label: 'Annuler',
					            className: 'btn-default'
					        }
					    },
			    		callback: function(result){
			    			if (result) {
				    			$("#fmr_consultation").attr('action', Routing.generate('ofsa_consultation_download')).attr('target', '_blank').submit();
                				$("#fmr_consultation").attr('action', '').attr('target', '');
				    		}
				    	}
				    });
			    }

	        },
	        error: function(){
	        	$(".alert-waiting").toggleClass('hide');
	        }
	    });
    });

	//gestion de la soumission du formulaire si extraction tableau Phyto : comptage du nombre de donnée
    $("#extract-phyto").click(function(event){
    	event.preventDefault();

    	var postData = $("#fmr_consultation").serializeArray();

    	$.ajax({
        	url: Routing.generate('ofsa_consultation_getcountphyto'),
	        method: 'POST',
	        data: postData,
	        beforeSend: function() {
	            $(".alert-waiting").toggleClass('hide');
	        },
	        success: function(data) {
	            $(".alert-waiting").toggleClass('hide');

	            if (data == "0") {
			    	bootbox.alert({ 
						size: "large",
						title: "Information du lot",
						message: "Cette selection ne renvoi aucune donnée avec coeficient d'abondance-dominance",
						buttonName : {
							label: "Fermer",
							className: "btn-ofsa",
						}
					});
			    } else {
			    	bootbox.confirm({
			    		size: "large",
			    		title: "Information du lot",
			    		message: "Cette selection va renvoyer "+data+" données avec coeficient d'abondance-dominance", 
			    		buttons: {
					        confirm: {
					            label: 'Confirmer',
					            className: 'btn-ofsa'
					        },
					        cancel: {
					            label: 'Annuler',
					            className: 'btn-default'
					        }
					    },
			    		callback: function(result){
			    			if (result) {
				    			$("#fmr_consultation").attr('action', Routing.generate('ofsa_consultation_download_phyto')).attr('target', '_blank').submit();
                	$("#fmr_consultation").attr('action', '').attr('target', '');
				    		}
				    	}
				    });
			    }
	        },
	        error: function(){
	        	$(".alert-waiting").toggleClass('hide');
	        }
	    });
    });


	/******
	* 		Input
	******/
    //zone de liste des syntaxons
    function loadZTSyntaxon(){ 
	    $("#zt_syntaxon").autocomplete({
			source: '/a/syntaxon.html',
			select: function(event, ui) {
				var $container = $('div#tpl-syntaxon');
		        var index = $("div#lst_syntaxon").find('span.blc-syntaxon').length;
		        var id = "", name = "", prototype;

				var $prototype = $($container.attr('data-prototype')
										.replace(/__INDEX__/g, index)
										.replace(/__SYNTAXON__/g, ui.item.syntaxon));

		        $("div#lst_syntaxon").append($prototype);
				$("#zt_syntaxon").val("");
				$('#div_info-syntaxon').css({'display' : 'block'});
				setTimeout(function(){$("#div_info-syntaxon").fadeOut('200');}, 2000);

				return false;
			}
		}).data('ui-autocomplete')._renderItem = function( ul, item ) {
	        return $( "<li>" )
	            .data( "item.autocomplete", item )
	            .append( '<a style="text-align:left;">' + item.syntaxon + '</a>' )
	            .appendTo( ul );
	    };
	}

	/******
	* 		END Input
	******/

	//suppression données quand liste multiple (resultat en JSON)
	$(document).on("click", ".glyphicon-remove", function(){$(this).parent().remove();});


	/***
	*
	*	Carto
	*
	***/
	var epsg3857 = new ol.proj.get('EPSG:3857');
    var projectionExtent = epsg3857.getExtent();
    var size = ol.extent.getWidth(projectionExtent) / 256;
    var resolutions = new Array(14);
    var matrixIds = new Array(14);
    for (var z = 0; z < 22; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }

    window.map_form =   new ol.Map({
                        target: 'map_form',
                        controls: ol.control.defaults({
                            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                                collapsible: true
                            })
                        }).extend([
                        new ol.control.ScaleLine()
                        ]),
                        view: new ol.View({
                            center: ol.proj.transform([-0.26, 44.86], 'EPSG:4326', 'EPSG:3857'),
                            zoom: 7,
                            projection: epsg3857, 
                        })
  	});
  
    var attributionIGN =   new ol.Attribution({
                            html: '<a href="http://www.ign.fr/" target="_blank"><img src="/ofsa/images/partenaires/wh80px/ign.png"></a>'
                                + '<a href="http://www.geoportail.fr/" target="_blank"><img src="http://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a>'
                                + '<a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf" alt="TOS" title="TOS" target="_blank">Conditions</a>'
                        });

    var attributionCBNSA =  new ol.Attribution({
                                html: '<a href="http://www.cbnsa.fr/" target="_blank"><img src="/ofsa/images/partenaires/wh80px/cbnsa.png" title="CBNSA WMS"></a>'
                            });

    map_form.addLayer(
        new ol.layer.Group({
            'title': 'Fonds de plan',
            'order': 0,
            'icone': '/images/icone/cc_layers.png',
            'displayInLayerSwitcher' : true,
            layers: [
                new ol.layer.Tile({
                    opacity: 1,
                    title: 'IGN - vue aérienne',
                    'displayInLayerSwitcher' : true,
                    'order': 1,
                    extent: projectionExtent,
                    source: new ol.source.WMTS({
                        attributions: [attributionIGN],
                        url: 'http://wxs.ign.fr/' + ofsa_config.key_ign + '/geoportail/wmts',
                        layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
                        matrixSet: 'PM',
                        format: 'image/jpeg',
                        name: "IGN - cartes",
                        style: "normal",
                        numZoomLevels: 19,
                        group : 'IGN',
                        territory:'FXX',
                        projection: epsg3857,
                        tileGrid: new ol.tilegrid.WMTS({
                            origin: ol.extent.getTopLeft(projectionExtent),
                            resolutions: resolutions,
                            matrixIds: matrixIds
                        })
                    })
                }),
                new ol.layer.Tile({
                    opacity: 0.3,
                    title: 'IGN - cartes',
                    'order': 0,
                    'displayInLayerSwitcher' : true,
                    extent: projectionExtent,
                    source: new ol.source.WMTS({
                        attributions: [attributionIGN],
                        url: 'http://wxs.ign.fr/' + ofsa_config.key_ign + '/geoportail/wmts',
                        layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
                        matrixSet: 'PM',
                        format: 'image/jpeg',
                        name: "IGN - cartes",
                        style: "normal",
                        numZoomLevels: 19,
                        group : 'IGN',
                        territory:'FXX',
                        projection: epsg3857,
                        tileGrid: new ol.tilegrid.WMTS({
                            origin: ol.extent.getTopLeft(projectionExtent),
                            resolutions: resolutions,
                            matrixIds: matrixIds
                        })
                    })
                }),
                new ol.layer.Tile({
                    opacity: 0.8,
                    title: 'G&eacute;ologie',
                    'order': 2,
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    source: new ol.source.TileWMS({
                        attributions: [new ol.Attribution({
                            html: '&copy; ' +
                            '<div><a href="http://www.brgm.fr/" target="_blank"><img src="/ofsa/images/partenaires/wh80px/brgm.png" title="BRGM"></a></div>'
                            })],
                        crossOrigin: null,
                        params: {
                            'LAYERS': 'GEOLOGIE',
                            'FORMAT': 'image/png',
                            'TRANSPARENT' : 'TRUE',
                            'PROJECTION':'EPSG:3857'
                        },
                        url: 'http://geoservices.brgm.fr/geologie?',
                        serverType: 'mapserver'
                    })
                }),
                new ol.layer.Tile({
                    opacity: 0.8,
                    title: 'Mailles 5km',
                    'order': 3,
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    source: new ol.source.TileWMS({
                        attributions: [attributionCBNSA],
                        crossOrigin: null,
                        params: {
                            'LAYERS': 'grille_5km',
                            'FORMAT': 'image/png',
                            'TRANSPARENT' : 'TRUE',
                            'PROJECTION':'EPSG:3857'
                        },
                        url: 'http://92.243.19.0/cgi-bin/mapserv5?map=/var/www/html/cbnsa/wms/mapfile/ofsa_fonds_plan.map',
                        serverType: 'mapserver'
                    })
                }),
                new ol.layer.Tile({
                    opacity: 0.8,
                    title: 'Mailles 1km',
                    'order': 4,
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    source: new ol.source.TileWMS({
                        attributions: [attributionCBNSA],
                        crossOrigin: null,
                        params: {
                            'LAYERS': 'grille_1km',
                            'FORMAT': 'image/png',
                            'TRANSPARENT' : 'TRUE',
                            'PROJECTION':'EPSG:3857'
                        },
                        url: 'http://92.243.19.0/cgi-bin/mapserv5?map=/var/www/html/cbnsa/wms/mapfile/ofsa_fonds_plan.map',
                        serverType: 'mapserver'
                    })
                }),
                new ol.layer.Tile({
                    opacity: 0.8,
                    title: 'Régions et départements',
                    'order': 5,
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    source: new ol.source.TileWMS({
                        attributions: [attributionCBNSA],
                        crossOrigin: null,
                        params: {
                            'LAYERS': 'regions,departements',
                            'FORMAT': 'image/png',
                            'TRANSPARENT' : 'TRUE',
                            'PROJECTION':'EPSG:3857'
                        },
                        url: 'http://92.243.19.0/cgi-bin/mapserv5?map=/var/www/html/cbnsa/wms/mapfile/ofsa_fonds_plan.map',
                        serverType: 'mapserver'
                    })
                }),
                new ol.layer.Tile({
                    opacity: 0.8,
                    title: 'Grande région',
                    'order': 6,
                    visible: true,
                    'displayInLayerSwitcher' : true,
                    source: new ol.source.TileWMS({
                        attributions: [attributionCBNSA],
                        crossOrigin: null,
                        params: {
                            'LAYERS': 'grande_region',
                            'FORMAT': 'image/png',
                            'TRANSPARENT' : 'TRUE',
                            'PROJECTION':'EPSG:3857'
                        },
                        url: 'http://92.243.19.0/cgi-bin/mapserv5?map=/var/www/html/cbnsa/wms/mapfile/ofsa_fonds_plan.map',
                        serverType: 'mapserver'
                    })
                }),
                new ol.layer.Tile({
                    opacity: 0.8,
                    title: 'Communes',
                    'order': 7,
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    source: new ol.source.TileWMS({
                        attributions: [attributionCBNSA],
                        crossOrigin: null,
                        params: {
                            'LAYERS': 'communes_tag',
                            'FORMAT': 'image/png',
                            'TRANSPARENT' : 'TRUE',
                            'PROJECTION':'EPSG:3857'
                        },
                        url: 'http://92.243.19.0/cgi-bin/mapserv5?map=/var/www/html/cbnsa/wms/mapfile/ofsa_fonds_plan.map',
                        serverType: 'mapserver'
                    })
                })
            ]
        }));
    
    
    var geoJsonFormat = new ol.format.GeoJSON({projection: new ol.proj.get('EPSG:3857')});
    var vectorSource = new ol.source.Vector({format: geoJsonFormat });
    var vector = new ol.layer.Vector({
            source: vectorSource,
            'queryable': false,
            visible: true,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.6)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#5C84E8',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#5C84E8'
                    })
                })
            })
    });
  
  	map_form.addLayer(vector);

  
  
  	/** Contrôles **/
  
  	/* création des éléments 'Type de geo' */
    var divChoiceTypeGeom = $('#control-choice-type-geom')
    .addClass('controlChoiceTypeGeom ol-unselectable ol-control')
    .removeClass('hide');
    var ChoiceTypeGeomControl = new ol.control.Control({
        element: divChoiceTypeGeom[0]
    }).setMap(map_form);
    
    /* création de l'élément 'Recherche commune' */
    var divFlyToCom = $('#control-fly-to-commune')
    .addClass('controlFlyToCom ol-unselectable ol-control')
    .removeClass('hide');
    var divFlyToComControl = new ol.control.Control({
        element: divFlyToCom[0]
    }).setMap(map_form);

    /* création de l'élément 'Recherche commune' */
    var layerSwitcher = $('#toolbox')
    .addClass('ol-unselectable ol-control')
    .removeClass('hide');
    var layerSwitcherControl = new ol.control.Control({
        element: layerSwitcher[0]
    }).setMap(map_form);
  
  
  
  
	/*******************************************************************/  
	/*********************** Dessin sur carte **************************/
	/*******************************************************************/
	var select = new ol.interaction.Select({
        layers: [vector],
        wrapX: false
    });

  	window.controls = {
        polygon: new ol.interaction.Draw({
                    source: vectorSource,
                    type: ("Polygon"), /** @type {ol.geom.GeometryType} */ 
                    style: new ol.style.Style({
                                fill: new ol.style.Fill({
                                    color: 'rgba(255, 255, 255, 0.2)'
                                }),
                                stroke: new ol.style.Stroke({
                                    color: '#ffcc33',
                                    width: 2
                                }),
                                image: new ol.style.Circle({
                                    radius: 7,
                                    fill: new ol.style.Fill({
                                        color: '#ffcc33'
                                    })
                                })
                            })
        }),
        /*move: new OpenLayers.Control.DragFeature(vector,{
            'dragComplete':function(){
                var obj = vector.selectedFeatures[0];
                checkGeom(obj, obj.attributes.type);
            }
        }),*/
        modify: new ol.interaction.Modify({ features: select.getFeatures() }),
        suppr: new ol.interaction.Select({
                            layers: [vector],
                            wrapX: false,
                            style: new ol.style.Style({
                                fill: new ol.style.Fill({
                                    color: 'rgba(150, 150, 150, 0.3)'
                                }),
                                stroke: new ol.style.Stroke({
                                    color: 'rgba(100, 100, 100, 0)',
                                    width: 2
                                }),
                                image: new ol.style.Circle({
                                    radius: 7,
                                    fill: new ol.style.Fill({
                                        color: '#ffcc33'
                                    })
                                })
                            })
                })
    }

    var selectedFeatures = controls.suppr.getFeatures();

    for(var key in controls) {
        map_form.addControl(controls[key]);
    }

    controls.polygon.on('drawstart', function(e){
        vectorSource.clear();
    });

    controls.polygon.on('drawend', function(e){
        $("#consult_valid_geom").val(geoJsonFormat.writeGeometry(e.feature.getGeometry()));
    });

    controls.modify.on('modifyend', function(e){
        $("#consult_valid_geom").val(geoJsonFormat.writeGeometry(e.features.item(0).getGeometry()));
    });

    controls.suppr.on('select', function(evt){
        if (evt.selected.length) {
            var feature = evt.selected[0];
            deleteSource.removeFeature(feature);
            var multi = new ol.geom.MultiPolygon();
            if (deleteSource.getFeatures().length) {
                for (var i = 0 ; i < deleteSource.getFeatures().length ; i++) {
                    var f = deleteSource.getFeatures()[i];
                    multi.appendPolygon(f.getGeometry());
                }
                vectorSource.getFeatures()[0].setGeometry(multi);
                var obj = geoJsonFormat.writeGeometry(vectorSource.getFeatures()[0].getGeometry());
                $('#consult_valid_geom').val(obj);
                checkGeom(obj);
            } else {
                vectorSource.clear();
                $('#consult_valid_geom').val('');
            }
            evt.selected = null;
        }   
    });
    

    function toggleControl(element) {
        map_form.removeInteraction(select);
        for(var key in controls) {
            var control = controls[key];
            if($(element).attr('id') == key) {
                map_form.addInteraction(control);
                if ($(element).attr('id') == 'modify') {
                    map_form.addInteraction(select);
                }
            } else {
                map_form.removeInteraction(control);
            }
        }
    }
    

    $('button[name="type-geom"]').click( function(e) {
        e.preventDefault();
        $(this).addClass('btn-primary');
        $(this).siblings().removeClass(' btn-primary');
        $(this).siblings().addClass('btn-default');
        
        // modifie l'interaction de la carte
        toggleControl(this);
    });

    if ( $("#consult_valid_geom").val() != '' ) {
        //si un objet on créer une feature avec cette geometrie et on ajoute à la source
        var geom = geoJsonFormat.readGeometry($("#consult_valid_geom").val())
        vectorSource.addFeature(new ol.Feature({geometry: geom }));
        zoomOnGeometry(geom);
    }


    switchLayer();

    $("#layerswitcher input[name=layer]").change(function() { switchLayer() } );

    function switchLayer()
    {

        var $target = $("#toolbox");

        var divs = new Array();
        //on boucle sur les différents groupes de couches qui existent
        map_form.getLayers().forEach(function(group, i){
            //si doit être present dans le controle des couches
            if ( group.get( 'displayInLayerSwitcher' ) ) {
                var $div1 = $("<div class='ls-feature'>");
                var $div2 = $("<div class=\"ls-header\">");
                $div2.append( $("<span class=\"ls-title switch hide\">").text( group.get('title') ) );
                $div2.append( $("<span class=\"ls-img\"><img src='/ofsa"+group.get('icone')+"'/></span>") );
                $div1.append( $div2 );

                $div2.click(function(){
                    $(this).parents('.ls-feature').find('.switch').each(function(){
                        $(this).hasClass('hide') ? $(this).removeClass('hide') : $(this).addClass('hide');
                    })
                });

                var spans = new Array();
                //boucle dans les couches du groupe
                group.getLayers().forEach(function(layer, f){

                    //si doit être present dans le controle des couches
                    if ( layer.get( 'displayInLayerSwitcher') ) {
                        
                        var $span = $('<li class="lst-layer">');
                        var $label = $('<label>').prop( 'for', layer.get('title').replace(/ /g, '-') + '_' + f );
                        var $input = $('<input>');
                        var $param = $('<img src="/ofsa/images/icone/roue_c.png" title="Modifier opacité">');
                        var $opaciteSlider = createSlider(layer, 'opacity', 'Opacité : ');

                        $input.prop( 'type', 'checkbox' );
                        $input.prop( 'class', 'cc-layerswitcher' );
                        $input.prop( 'id', layer.get('title').replace(/ /g, '-') + '_' + f );
                        $input.prop( 'checked', layer.get('visible') );
                        $input.change(function(e) {
                            layer.setVisible(e.target.checked);
                        });

                        $param.click(function(e){
                            $opaciteSlider.slideToggle();
                        });

                        $span.append( $label.append( $input ).append( layer.get('title') ) );
                        $span.append( $param );
                        $span.append( $opaciteSlider );
                        //on organise la donnée
                        spans[layer.get('order')] = $span;

                    }
                });
                $div2 = $("<ul class='ls-body switch hide'>");
                for (var f = 0; f < spans.length; f++) { 
                    $div2.append( spans[f] );
                }
                $div1.append( $div2 );
                divs[group.get('order')] = $div1;
            }
        });
        for (var i = 0; i < divs.length; i++) { 
            $target.append( divs[i] );
        }

    }
  
    function createSlider(layer, option, label) {

        var $divSlider = $('<div class="uislider-content">');
        var $labelSlider = $('<span class="uislider-label">').html(label);
        var $slider = $('<div class="uislider-opa">');
        var $valSlider = $('<span class="uislider-values">');

        var valeur = layer.get(option);
        noUiSlider.create($slider[0], {
            start: valeur,
            step: 0.1,
            range: {
                min: 0,
                max: 1
            }
        });

        $slider[0].noUiSlider.on('update', function( values, handle ) {
            layer.setOpacity(values);
            $valSlider.html( (values*100) +'%');
        });
        
        return $divSlider.append($labelSlider).append($valSlider).append($slider);
    }
  
  
  
  /*******************************************************************/  
  /*********************** Zoom sur commune **************************/
  /*******************************************************************/

    var xhr;

    var autocompleteVectorSource = new ol.source.Vector({format: geoJsonFormat });
    var autocompleteVector = new ol.layer.Vector({
            source: autocompleteVectorSource,
            'queryable': false,
            'displayInLayerSwitcher' : false,
            visible: true,
            style: new ol.style.Style({
                    fill: new ol.style.Fill({
                            color: [255,255,255,0.2]
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#FF530D',
                        lineDash: [2, 6],
                        width: 3
                    })
            })
    });
  
    map_form.addLayer(autocompleteVector);

    $('#fly-to-commune').typeahead({
        hint: false,
        highlight: true,
        minLength: 3
    },
    {
        name: 'communes',
        limit: Infinity, // Attention ici, bug de l'API. Si on met une limite et que le nombre de résultats est inférieur à cette limite, seule le premier résultat sera retourné... Solution trouvée : Infinity ici, et c'est le serveur qui limite le nombre de réponse
        async: true,
        display: function(suggestion) {
            return suggestion.label
        },
        // source des résultats. Dans notre cas, AJAX donc on renvoie la variable asyncResults 
        source: function trouveEspeces( query, syncResults, asyncResults ) {

            if( typeof(xhr) !== 'undefined' ) {
                xhr.abort();
            }
            
            xhr = $.ajax({
                url: Routing.generate('ofsa_referentiel_commune_autocomplete') + '/' + query,
                dataType: 'json'
            }).success( function(data) {
                // c'est la façon de procéder... on obéit //
                asyncResults( data );
            });
        },
        // modifie le template d'un item de liste //
        templates: {
            suggestion: function (data) {
            return '<div data-id="'+ data.insee_com +'" class="tt-suggestion tt-selectable">'+ data.label + '</div>';
       
        },
        pending: '<div class="loading load1"></div>'
        }
    });
   
    // modifie le comportement lors d'un select de l'item //
    $('#fly-to-commune').bind('typeahead:selected', function(ev, suggestion) {
    
        // Affiche le nom de la commune dans le champ d'autocomplétion
        $(this).typeahead('val', suggestion.label);
        
        // Affiche la géométrie de la commune
        autocompleteVectorSource.clear();
        
        var f = new ol.format.GeoJSON();
        var geom = f.readGeometry(suggestion.geojson);
        var olFeature = new ol.Feature(geom);
        
        autocompleteVectorSource.addFeature( olFeature );
        
        // Zoom sur la commune avec la BBOX
        zoomOnGeometry(geom)   
    });


    function zoomOnGeometry(geom) {
        var extent = geom.getExtent();

        map_form.getView().fit(extent, {
        	size: map_form.getSize(),
        	duration: 2000
        });
    }


/******
* 		END Carto
******/

});