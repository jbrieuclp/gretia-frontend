$(function(){
	"use strict"

	//
    // Create map, giving it a rotate to north control.
    //
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

    window.map_result =   new ol.Map({
                        target: 'map_result',
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

    map_result.addLayer(
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


    window.geoJsonFormat = new ol.format.GeoJSON({projection: new ol.proj.get('EPSG:3857')});

  
  /** Contrôles **/
      
    /* création de l'élément 'Recherche commune' */
    var divFlyToCom = $('#control-fly-to-commune-result')
    .addClass('controlFlyToCom ol-unselectable ol-control')
    .removeClass('hide');
    var divFlyToComControl = new ol.control.Control({
        element: divFlyToCom[0]
    }).setMap(map_result);

    /* création de l'élément 'Recherche commune' */
    var layerSwitcher = $('#toolbox_result')
    .addClass('ol-unselectable ol-control')
    .removeClass('hide');
    var layerSwitcherControl = new ol.control.Control({
        element: layerSwitcher[0]
    }).setMap(map_result);


    switchLayer();

    $("#layerswitcher input[name=layer]").change(function() { switchLayer() } );

    function switchLayer()
    {

        var $target = $("#toolbox_result");

        var divs = new Array();
        //on boucle sur les différents groupes de couches qui existent
        map_result.getLayers().forEach(function(group, i){
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
  
    map_result.addLayer(autocompleteVector);

    $('#fly-to-commune-result').typeahead({
        hint: false,
        highlight: true,
        minLength: 3
    },
    {
        name: 'commune',
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
    $('#fly-to-commune-result').bind('typeahead:selected', function(ev, suggestion) {
    
        // Affiche le nom de la commune dans le champ d'autocomplétion
        $(this).typeahead('val', suggestion.label);
        
        // Affiche la géométrie de la commune
        autocompleteVectorSource.clear();
        
        var f = new ol.format.GeoJSON();
        var geom = f.readGeometry(suggestion.geojson);
        var olFeature = new ol.Feature(geom);
        
        autocompleteVectorSource.addFeature( olFeature );
        
        // Zoom sur la commune avec la BBOX
        var extent = geom.getExtent();

        map_result.getView().fit(extent, {
            size: map_result.getSize(),
            duration: 2000
        });

    });
});