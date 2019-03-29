$(function(){
    "use strict"

    // Afficher / cacher les menu item gauche
    // ---
    $('#left-tab-content .left-tab-menu-ouvrant, #left-tab-content .left-tab-menu-ouvrant *').hover(function() {
        $('[data-toggle="tooltip"]').tooltip('hide');
    });

    //ouvre le menu associé à l'image
    $('#left-tab-content .menu-item img').click(function(event){
        if ( !$(event.target).parents('div.bouton-content').length && !$(event.target).is('div.bouton-content')) {
            event.stopPropagation();
            //si la fenetre est fermée on l'ouvre
            if (  $(this).parent('.menu-item').children('.left-tab-menu-ouvrant').hasClass('hide') ) {
                $('#left-tab-content .menu-item .left-tab-menu-ouvrant').addClass('hide');
                $('[data-toggle="tooltip"]').tooltip('hide');
                $(this).parent('.menu-item').children('.left-tab-menu-ouvrant').toggleClass('hide');
                setPosition($(this).parent('.menu-item').children('.left-tab-menu-ouvrant'));
            } else {
                //sinon la ferme
                $(this).parent('.menu-item').children('.left-tab-menu-ouvrant').addClass('hide');
            }
        }
    });

    //cache le menu ouvert si clic ailleurs
    $('html').not( "#left-tab-content .left-tab-menu-ouvrant" ).click(function(event){
        if ( !$(event.target).parents('.menu-item').length && !$(event.target).is('.menu-item')) {
            $('#left-tab-content .menu-item .left-tab-menu-ouvrant').addClass('hide');
        }
    });

    function setPosition(e){
        e.css({'max-height': $('#global-content').height() - 10, 'overflow-y': 'auto'});
    }

    //boutton pleine page
    $('#resize-global').click(function(){
        $("#content").toggleClass('full-size');
        map.setSize([$("#map").width(), $("#map").height()]);
    })

    // Activation des tooltip d'aides (sauf pour l'input d'autocomplétion, qui sera activé au choix si l'utilisateur choisi un indicateur sans avoir choisi de taxon)
    // ---
    $('[data-toggle="tooltip"]').not('#choix-espece input.typeahead').tooltip();

    //gestion du paneau d'affichage de droite
    $("#right-tab .hidetab").click(function(){
        $("#right-tab-content").animate({width: 'toggle', display: 'inline-block'});
        $(this).children('img').toggleClass('inverse');
    });


    //gestion des onglets right panel
    $("#principal-access-onglet > ul > li").click(function(){
        var target = $(this).attr('data-toggle');
        $(".right-tab-element").fadeOut('200');
        $("#principal-access-onglet > ul > li").removeClass('active');
        $(this).addClass('active');
        setTimeout(function(){
            $(target).fadeIn('200');
        }, 200);
    });

    $("#control-fly-to-commune input#fly-to-commune").focusin(function(){
        $( "#control-fly-to-commune, input#fly-to-commune" ).animate({ width: '350px' }, 300);
    }).focusout(function(){
        $( "#control-fly-to-commune, input#fly-to-commune" ).animate({ width: '180px' }, 500);
    });
   

    // On définit des variables globales qui nous serviront à gérer les mouvements lors des events
    // gtl pour Groupes Taxo List
    // ATTENTION POUR RAPPEL : jamais de '-' dans les noms de variables en JS. Utiliser des '_' car il ne reconnait pas sinon.
    window.gtl = {
        'viewport_width': 1 * $("#module-choix-gpe-taxo .viewport").css('width').replace('px',''),
        'visible_item' : 2,
        'first_visible_level': 1,
        'nb_item': $("#module-choix-gpe-taxo .choix-gpe-item").length,
        'animate': function(orientation) {
                if ( orientation == 'prev' ) {
                    $('#module-choix-gpe-taxo .float-content').animate({
                        left: '+='+this.item_width+'px'
                    });
                    this.first_visible_level -= 1;
                    this.last_visible_level -= 1;
                    if ( this.first_visible_level == 1 ) {
                        $('#module-choix-gpe-taxo .choix-gpe-prev').addClass('disabled');
                    } else {
                        $('#module-choix-gpe-taxo .choix-gpe-prev').removeClass('disabled');
                    }
                    if ( this.last_visible_level == this.nb_item ) {
                        $('#module-choix-gpe-taxo .choix-gpe-next').addClass('disabled');
                    } else {
                        $('#module-choix-gpe-taxo .choix-gpe-next').removeClass('disabled');
                    }
                }
                if ( orientation == 'next' ) {
                    $('#module-choix-gpe-taxo .float-content').animate({
                        left: '-='+this.item_width+'px'
                    });
                    this.first_visible_level += 1;
                    this.last_visible_level += 1;
                    if ( this.first_visible_level == 1 ) {
                        $('#module-choix-gpe-taxo .choix-gpe-prev').addClass('disabled');
                    } else {
                        $('#module-choix-gpe-taxo .choix-gpe-prev').removeClass('disabled');
                    }
                    if ( this.last_visible_level == this.nb_item ) {
                        $('#module-choix-gpe-taxo .choix-gpe-next').addClass('disabled');
                    } else {
                        $('#module-choix-gpe-taxo .choix-gpe-next').removeClass('disabled');
                    }
                }
        },
        'onClick': function() {
        
                // Sélectionne l'item "li" et désactive les autres de ce niveau
                $(this).closest('ul').children('li').not($(this)).removeClass('active');
                $(this).addClass('active');
                
                // Charge la carto
                $('[data-form="fmr-indicateur"][name="gpe-taxo"]').val($(this).attr('data-item')).trigger('change');
        
                // Récupération du niveau cliqué
                var level = 1*$(this).closest('div').attr('data-level');
        
                // Charge la liste du niveau inférieur
                $.ajax({
                    url: Routing.generate('trouve_groupes_taxo_niveau_inferieur') + '/' + $(this).attr('data-item'),
                    dataType: 'json'
                }).success( function(data) {
        
                    // Uniquement si il y a des enfants
                    if ( !$.isEmptyObject(data) ) {
                            
                        // La DIV niveau inférieur existe t elle ?
                        // -------------------------------------------------
                        var create_div = $('#module-choix-gpe-taxo div[data-level="'+(level+1)+'"]').length == 0;
                        // non : on la créé
                        if ( create_div ) {
                            var div_inferieur = $('<div data-level="'+(level+1)+'" class="choix-gpe-item" style="width: '+gtl.item_width+'px"></div>');
                            $('#module-choix-gpe-taxo .float-content').append(div_inferieur);
                            gtl.nb_item += 1;
                            // agrandissement de la zone float-content
                            $("#module-choix-gpe-taxo .float-content").css('width',gtl.item_width * gtl.nb_item + 'px');
                        } 
                        // oui : on la récupère (et on la vide etc)
                        else {
                            var div_inferieur = $('#module-choix-gpe-taxo div[data-level="'+(level+1)+'"]');
                            div_inferieur.empty();
                            // on supprime toutes les div niveau inférieur + 2
                            $('#module-choix-gpe-taxo div.choix-gpe-item').each( function() {
                                if ($(this).attr('data-level') >= (level + 2) ) {
                                    $(this).remove();
                                    gtl.nb_item -= 1;
                                }
                            });
                            // Rétrécissement de la zone de float-content
                            $("#module-choix-gpe-taxo .float-content").css('width',gtl.item_width * gtl.nb_item + 'px');
                        }
                
                
                        // Génère la liste des enfants
                        // -------------------------------------------------
                        var enfants = [];
                        enfants.push('<ul>');
                        $.each( data, function( key, val ) {
                            enfants.push('<li data-item="'+val.id+'">'+val.libelle+'</li>');
                        });
                        enfants.push('</ul>');
                        var DOMenfants = enfants.join('');
                        div_inferieur.append(DOMenfants);
                        
                        
                        // Ajoute les évènements lors d'un clic sur un enfant
                        // -------------------------------------------------                
                        $('#module-choix-gpe-taxo div[data-level="'+(level+1)+'"] ul li').click( gtl.onClick );
                
                
                        // On décale les listes si le niveau cliqué est le dernier visible
                        // -------------------------------------------------
                        if ( level == gtl.last_visible_level ) {
                            gtl.animate('next');
                        }
                
                    }
                    // Aucun enfant n'est trouvé : on est en bout d'arbre
                    else {
                    
                        $('#module-choix-gpe-taxo div.choix-gpe-item').each( function() {
                            if ($(this).attr('data-level') >= (level + 1) ) {
                                $(this).remove();
                            }
                        });
                        
                        // Rétrécissement de la zone de float-content
                        $("#module-choix-gpe-taxo .float-content").css('width',gtl.item_width * gtl.nb_item + 'px');
                    
                    }
            });
        }
        
        
    };
    gtl.item_width = gtl.viewport_width / gtl.visible_item;
    gtl.last_visible_level = gtl.first_visible_level + gtl.visible_item -1 ;

    
    // Fixe la largeur des item
    $("#module-choix-gpe-taxo .choix-gpe-item").css('width',gtl.item_width + 'px');
    // Fixe la largeur du float-content
    $("#module-choix-gpe-taxo .float-content").css('width',gtl.item_width * gtl.nb_item + 'px');
    
    // Fait défiler la liste : next 
    $("#module-choix-gpe-taxo .choix-gpe-next").click( function() {
        if ( gtl.last_visible_level < gtl.nb_item ) {
            gtl.animate('next');
        }
    });
    
    // Fait défiler la liste : prev
    $("#module-choix-gpe-taxo .choix-gpe-prev").click( function() {
        if ( gtl.first_visible_level > 1 ) {
            gtl.animate('prev');
        }
    });
    
    // Action lors d'un clic sur un groupe
    $('#module-choix-gpe-taxo .choix-gpe-item ul li').click( gtl.onClick );


    window.createControlePanel = function()
    {
        var $target = $("div#template_layerscontrol");
        $("div#template_layerscontrol").html('');

        var divs = new Array();
        //on boucle sur les différents groupes de couches qui existent
        map.getLayers().forEach(function(group, i){
            //si doit être present dans le controle des couches
            if ( group.get( 'displayInLayerSwitcher' ) ) {
                var $div1 = $("<div class=\"panel panel-default\">");
                var $div2 = $("<div class=\"panel-heading\" data-toggle=\"collapse\" data-target=\"#"+group.get('title').replace(/ /g, '-')+"\" aria-expanded=\"false\" aria-controls=\""+group.get('title').replace(/ /g, '-')+"\">");
                $div2.text(group.get('title'));
                $div1.append( $div2 );
                var spans = new Array();
                //boucle dans les couches du groupe
                group.getLayers().forEach(function(layer, f){

                    //si doit être present dans le controle des couches
                    if ( layer.get( 'displayInLayerSwitcher') ) {
                        
                        var $span = $('<div class="checkbox lst-layer">');
                        var $label = $('<label>').prop( 'for', layer.get('title').replace(/ /g, '-') + '_' + f );
                        var $input = $('<input>');
                        var $param = $('<img src="/carte/bundles/visuconsultation/carto/images/icones/roue_c.png" title="Modifier opacité">');
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
                        $span.append( $label.append( $input ).append( ' '+layer.get('title') ) );
                        $span.append( $param );
                        $span.append( $opaciteSlider );
                        //on organise la donnée
                        spans[layer.get('order')] = $span;

                    }
                });
                $div2 = $("<div class=\"panel-body collapse\"  id=\""+group.get('title').replace(/ /g, '-')+"\">");
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


    $("#left-panel .bloc-bouton .bouton-icon")
    .mouseenter(function(){
        $(this).parents().children('.bouton-title').css('display', 'block');
    })
    .mouseleave(function(){
        $(this).parents().children('.bouton-title').css('display', 'none');
    });

    $("#left-panel .bloc-bouton").click(function(e){
        if ( !$(event.target).parents('div.bouton-content').length && !$(event.target).is('div.bouton-content')) {
            event.stopPropagation();
            //si la fenetre est fermée on l'ouvre
            if ( $(this).children('.bouton-content').css('display') == 'none' ) {
                $('#left-panel .bouton-content').css('display', 'none');
                $(this).children('.bouton-title').css('display', 'none');
                $(this).children('.bouton-content').css('display', 'block');
                setPosition($(this).children('.bouton-content'))
            } else {
                //sinon la ferme
                $(this).children('.bouton-content').css('display', 'none');
            }
        }
    });


    /*****
    *
    *   Module Carto
    *
    *****/

    var epsg3857 = new ol.proj.get('EPSG:3857');
    var formatGeoJSON = new ol.format.GeoJSON({projection: epsg3857});

    var projectionExtent = epsg3857.getExtent();
    var size = ol.extent.getWidth(projectionExtent) / 256;
    var resolutions = new Array(14);
    var matrixIds = new Array(14);
    for (var z = 0; z < 22; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }

    var attributionIGN =   new ol.Attribution({
                            html: '<a href="http://www.ign.fr/" target="_blank"><img src="/carte/bundles/visuconsultation/carto/images/logos/wh80px/ign.png"></a>'
				+ '<a href="http://www.geoportail.fr/" target="_blank"><img src="http://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a>'
                                + '<a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf" alt="TOS" title="TOS" target="_blank">Conditions</a>'
                        });
							
    window.map =   new ol.Map({
                    target: 'map',
                    controls: ol.control.defaults({
                        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                            collapsible: true
                        })
                    }).extend([
                        new ol.control.ScaleLine()
                    ]),
                    view: new ol.View({
                        center: ol.proj.transform([-0.18, 48.08], 'EPSG:4326', 'EPSG:3857'),
                        zoom: 7,
                        projection: epsg3857, 
                    })/*,
                    size: new ol.Size*/
                });

    map.addLayer(
        new ol.layer.Group({
            'title': 'Fonds de plan',
            'order': 0,
            'displayInLayerSwitcher' : true,
            layers: [
                new ol.layer.Tile({
                    title: 'OpenTopoMap - cartes',
                    visible: true,
                    'order': 0,
                    'displayInLayerSwitcher' : true,
                    opacity: 0.4,
                    type: 'base',
                    visible: true,
                    source: new ol.source.XYZ({
                        url: '//{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    })
                }),
                new ol.layer.Tile({
                    opacity: 1,
                    title: 'IGN - vue aérienne',
                    visible: false,
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
                    'order': 2,
                    visible: false,
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
                new ol.layer.Vector({
                    opacity: 0.9,
                    title: 'Limite Massif armoricain', 
                    'order': 3,
                    visible: true,
                    'displayInLayerSwitcher' : true,
                    source:  new ol.source.Vector({
                        format: new ol.format.GeoJSON({projection: new ol.proj.get('EPSG:3857')}),
                        url: '/carte/bundles/visuconsultation/geojson/limite_ma.geojson' 
                    }),
                    style: function(feature, resolution) {
                        return new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: '#cc0a00',
                                width: 2,
                                lineDash: [5],
                                lineDashOffset: 4
                            })
                        });
                    }
                })/*,
                new ol.layer.Tile({
                    opacity: 0.8,
                    title: 'G&eacute;ologie',
                    'order': 2,
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    source: new ol.source.TileWMS({
                        attributions: [new ol.Attribution({
                            html: '&copy; ' +
                            '<div><a href="http://www.brgm.fr/" target="_blank"><img src="/bundles/visuconsultation/carto/images/logos/wh80px/brgm.png" title="BRGM"></a></div>'
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
                })/*,
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
                })*/
            ]
        }));

    map.addLayer(new ol.layer.Group({
            title: 'Zonages',
            'order': 1,
            'displayInLayerSwitcher' : true,
            layers: [
                new ol.layer.Tile({
                    opacity: 1,
                    title: 'Parcs Naturels Régionaux',
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    'order': 0,
                    extent: projectionExtent,
                    source: new ol.source.WMTS({
                        attributions: [attributionIGN],
                        url: 'http://wxs.ign.fr/' + ofsa_config.key_ign + '/geoportail/wmts',
                        layer: 'PROTECTEDAREAS.PNR',
                        matrixSet: 'PM',
                        format: 'image/png',
                        name: "IGN - Parcs Naturels Régionaux",
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
                    opacity: 1,
                    title: 'Parcs Naturels Marins',
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    'order': 1,
                    extent: projectionExtent,
                    source: new ol.source.WMTS({
                        attributions: [attributionIGN],
                        url: 'http://wxs.ign.fr/' + ofsa_config.key_ign + '/geoportail/wmts',
                        layer: 'PROTECTEDAREAS.PNM',
                        matrixSet: 'PM',
                        format: 'image/png',
                        name: "IGN - Parcs Naturels Marins",
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
                    opacity: 1,
                    title: 'Réserves Naturelles Nationales',
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    'order': 2,
                    extent: projectionExtent,
                    source: new ol.source.WMTS({
                        attributions: [attributionIGN],
                        url: 'http://wxs.ign.fr/' + ofsa_config.key_ign + '/geoportail/wmts',
                        layer: 'PROTECTEDAREAS.RN',
                        matrixSet: 'PM',
                        format: 'image/png',
                        name: "IGN - Réserves Naturelles Nationales",
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
                    opacity: 1,
                    title: 'Réserves Biologiques',
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    'order': 3,
                    extent: projectionExtent,
                    source: new ol.source.WMTS({
                        attributions: [attributionIGN],
                        url: 'http://wxs.ign.fr/' + ofsa_config.key_ign + '/geoportail/wmts',
                        layer: 'PROTECTEDAREAS.RB',
                        matrixSet: 'PM',
                        format: 'image/png',
                        name: "IGN - Réserves Biologiques",
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
                    opacity: 1,
                    title: 'Sites Natura 2000 (Directive Habitats)',
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    'order': 4,
                    extent: projectionExtent,
                    source: new ol.source.WMTS({
                        attributions: [attributionIGN],
                        url: 'http://wxs.ign.fr/' + ofsa_config.key_ign + '/geoportail/wmts',
                        layer: 'PROTECTEDAREAS.ZPS',
                        matrixSet: 'PM',
                        format: 'image/png',
                        name: "IGN - Sites Natura 2000 (Directive Habitats)",
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
                    opacity: 1,
                    title: 'Sites Natura 2000 (Directive Oiseaux)',
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    'order': 5,
                    extent: projectionExtent,
                    source: new ol.source.WMTS({
                        attributions: [attributionIGN],
                        url: 'http://wxs.ign.fr/' + ofsa_config.key_ign + '/geoportail/wmts',
                        layer: 'PROTECTEDAREAS.SIC',
                        matrixSet: 'PM',
                        format: 'image/png',
                        name: "IGN - Sites Natura 2000 (Directive Oiseaux)",
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
                    opacity: 1,
                    title: 'ZNIEFF Type 1',
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    'order': 6,
                    extent: projectionExtent,
                    source: new ol.source.WMTS({
                        attributions: [attributionIGN],
                        url: 'http://wxs.ign.fr/' + ofsa_config.key_ign + '/geoportail/wmts',
                        layer: 'PROTECTEDAREAS.ZNIEFF1',
                        matrixSet: 'PM',
                        format: 'image/png',
                        name: "IGN - ZNIEFF Type 1",
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
                    opacity: 1,
                    title: 'ZNIEFF Type 2',
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    'order': 7,
                    extent: projectionExtent,
                    source: new ol.source.WMTS({
                        attributions: [attributionIGN],
                        url: 'http://wxs.ign.fr/' + ofsa_config.key_ign + '/geoportail/wmts',
                        layer: 'PROTECTEDAREAS.ZNIEFF2',
                        matrixSet: 'PM',
                        format: 'image/png',
                        name: "IGN - ZNIEFF Type 2",
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
                    opacity: 1,
                    title: 'Zones humides d\'importance internationale (RAMSAR)',
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    'order': 8,
                    extent: projectionExtent,
                    source: new ol.source.WMTS({
                        attributions: [attributionIGN],
                        url: 'http://wxs.ign.fr/' + ofsa_config.key_ign + '/geoportail/wmts',
                        layer: 'PROTECTEDAREAS.RAMSAR',
                        matrixSet: 'PM',
                        format: 'image/png',
                        name: "IGN - RAMSAR",
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
                })
            ]
        })
    );

    var selectStyle = (function() {

        var style = [new ol.style.Style({
            fill: new ol.style.Fill({color: 'rgba(166, 123, 44, 0.8)'}),
            stroke: new ol.style.Stroke({color: '#024CD6', width: 2})
        })];

        return function(feature, resolution) {
            if ( feature.getStyle() ) {
                //si jamais la feature possède un style fill on remplace le style par defaut
                style = [new ol.style.Style({
                    fill: feature.getStyle().getFill(),
                    stroke: new ol.style.Stroke({color: '#024CD6', width: 2})
                })];
            }

            return style;
        };

    })();

    //action de cliquer sur objet pour obtenir des informations
    var selectSingleClick = new ol.interaction.Select({
        style: selectStyle/*[new ol.style.Style({
                    stroke: new ol.style.Stroke({color: '#024CD6', width: 2}),
                    fill: new ol.style.Fill({color: 'rgba(0, 0, 0, 0)'}),
                })]*/,
        multi: true,
        layers: function(layer) {
            return layer.get('queryable') == true;
        }
    });
    map.addInteraction(selectSingleClick);

    
/*    map.addLayer(new ol.layer.Group({
            title: 'Masques',
            'displayInLayerSwitcher' : false,
            layers: [
                new ol.layer.Tile({
                    opacity: 0.6,
                    title: 'Masque_autre',
                    visible: true,
                    'displayInLayerSwitcher' : true,
                    source: new ol.source.TileWMS({
                        attributions: [attributionCBNSA],
                        crossOrigin: null,
                        params: {
                            'LAYERS': 'l_masque',
                            'FORMAT': 'image/png',
                            'TRANSPARENT' : 'TRUE',
                            'PROJECTION':'EPSG:3857'
                        },
                        url: 'http://92.243.19.0/cgi-bin/mapserv5?map=/var/www/html/cbnsa/wms/mapfile/cbnsa_masque.map',
                        serverType: 'mapserver'
                    })
                })
            ]
        })
    );
*/
    createControlePanel();


    //fonction d'ouverture de l'infobulle d'information de carte
    var displayFeatureInfo = function(pixel, coordinate) {
        var features = {};
        map.forEachFeatureAtPixel(pixel, function(feature, layer) {
            if ( layer !== null && layer.get('queryable') ) {
                var title = layer.get('title');
                var id = title.replace(/ /g, '_');
                if( !(id in features) ){ 
                    features[id] = {
                        'name': title,
                        'id': id,
                        'data': []
                    };
                }
                features[id]['data'].push(feature)
            }
        });

        //on teste si des objets peuvent être interrogé sinon on sort sans ouvrir d'infobulle
        if ( jQuery.isEmptyObject(features) ){ return false; }
        
        $("#modal_data_infos_content").html('<div class="text-center"><img src="/carte/bundles/visuconsultation/carto/images/icones/load-model.svg"></div>');
        $("#modal_data_infos").modal('show');

        var $ongletsTemplate = $('<div class="tab-element">');
        var $ul = $('<ul class="tabs" role="tablist">');
        $ongletsTemplate.append($ul).append('<div class="sub-tab"></div>');

        var $tabPanels = new Array();
        var compteur = 0;
        for (var couche in features){
            var layer = features[couche];

            /** Onglet **/
            var $li = $('<li>').attr('role', 'presentation');
            if (compteur == 0) {
                $li.addClass('active');
            } 

            var $a = $('<a>').attr('href', '#layer_info_'+compteur)
                           .attr('role', 'tab')
                           .attr('data-toggle', 'tab')
                           .text(layer.name);

            //on met le a dans le li qu'on met dans le ul              
            $ul.append($li.append($a));

            /** Content **/
            var $tabPanel = $('<div>').attr('role', 'tabpanel')
                                    .attr('id', 'layer_info_'+compteur)
                                    .addClass('tab-pane fade');
            if (compteur == 0) {
                $tabPanel.addClass('active in');
            }
            $tabPanels.push($tabPanel);

            for (var data in layer.data){
                var properties = layer.data[data].getProperties();
                var waiting_element = $('<div class="text-center"><p><img src="/carte/bundles/visuconsultation/carto/images/icones/load-model.svg"></p></div>');

                if ( typeof(properties['url']) != 'undefined' ){
                    $.ajax({
                        url: properties['url'],
                        'tabPanel': $tabPanel, //on assure le lien de l'assynchrone
                        'waiting_element': waiting_element, //on assure le lien de l'assynchrone
                        method: 'POST',
                        data: $("[data-form='fmr-indicateur']").serializeArray(),
                        beforeSend:function(){
                            this.tabPanel.append(this.waiting_element);
                        },
                        success: function(data) {
                            this.waiting_element.remove();
                            var oldValue = this.tabPanel.html();
                            this.tabPanel.html(oldValue+data);
                            setDynatable();    
                        },
                        error: function(data) {
                            this.waiting_element.remove();
                            var oldValue = this.tabPanel.html();
                            this.tabPanel.html(oldValue+'Une erreur est survenue<br>');    
                        }
                    }); 
                } else {
                    var oldValue = $tabPanel.html();
                    $tabPanel.html(oldValue+ 'Indisponible<br>'); 
                }
            }
            compteur++;
        }

        var $div = $('<div>'); //div qui va recevoir l'ensemble des contenu liés aux onglets
        $div.append($ongletsTemplate);
        //on rempli le div des différents contenu des onglets
        var $tabContent = $('<div class="tab-content bloc-ofsa">');
        if ($tabPanels.length) {
            for ( var $e in $tabPanels ) {
                $tabContent.append($tabPanels[$e]);
            }
            $div.append($tabContent);
        } else { $div.append('<div style="padding:15px;font-size:13px;">Aucune information disponible</div>');}
        $( '#modal_data_infos_content' ).html($div);
    };

    map.on('click', function(evt) {
        var coordinate = evt.coordinate;
        displayFeatureInfo(evt.pixel, coordinate);
    });


    var loadingDOM = $('<div><p><img src="/carte/bundles/visuconsultation/carto/images/icones/load-model.svg"></p></div>')
    .addClass('ol-unselectable ol-control loading load2 hide')
    .attr({
        id: 'load-maplayer',
    });
    var loadingControl = new ol.control.Control({
        element: loadingDOM[0]
    }).setMap(map);


    function setDynatable() {
        var dynatable = $(".dynatable").dynatable(dynatableOptions);
    }

    $(document).on('click', '.display-statuts', function(){
        var target = $(this).attr('data-target');

        if ( !$(this).prop("checked") ) {
            $(target).find('tr > th:nth-child(2), tr > td:nth-child(2)').css("display", "none");
        } else {
            $(target).find('tr > th:nth-child(2), tr > td:nth-child(2)').css("display", "");
        }
    });


    /*****
    *
    *   Fin module Carto
    *
    *****/

    

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
        
        return $divSlider.append($labelSlider).append($slider).append($valSlider);
    }

    function mapResize()
    {
        return $(window).height() - ( $("#page-header").height() + $("#page-footer").height() + 82 );
    }

});