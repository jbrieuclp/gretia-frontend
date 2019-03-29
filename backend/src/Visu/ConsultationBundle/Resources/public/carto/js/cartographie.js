$(function(){
    "use strict"

    var epsg3857 = new ol.proj.get('EPSG:3857');
    var formatGeoJSON = new ol.format.GeoJSON({projection: epsg3857});
    var ofsaMap = new OFSAMap(map);

    ofsaMap.addLayer('pressionconnaissance', Routing.generate('visu_carto_pc_geojson'), {
                    'title' : 'Pression d\'observations',
                    'queryable': true,
                    'visibility': false,
                    'legend': {
                        legendJson: {
                            "green": [
                                {
                                    "min": 1,
                                    "max": 10,
                                    "color": "rgba(230, 255, 213, 0.8)",
                                    "label": "De 1 à 10 observations"
                                },
                                {
                                    "min": 11,
                                    "max": 100,
                                    "color": "rgba(175, 255, 122, 0.8)",
                                    "label": "De 11 à 100 observations"
                                },
                                {
                                    "min": 101,
                                    "max": 500,
                                    "color": "rgba(130, 202, 82, 0.8)",
                                    "label": "De 101 à 500 observations"
                                },
                                {
                                    "min": 501,
                                    "max": 2000,
                                    "color": "rgba(75, 116, 47, 0.8)",
                                    "label": "De 501 à 2000 observations"
                                },
                                {
                                    "min": 2001,
                                    "max": Infinity,
                                    "color": "rgba(0, 0, 0, 0.8)",
                                    "label": ">2000 observations"
                                }
                            ],
                            "red": [
                                {
                                    "min": 1,
                                    "max": 2,
                                    "color": "rgba(242, 204, 203, 0.8)",
                                    "label": "De 1 à 2 observations"
                                },
                                {
                                    "min": 3,
                                    "max": 5,
                                    "color": "rgba(243, 131, 130, 0.8)",
                                    "label": "De 3 à 5 observations"
                                },
                                {
                                    "min": 6,
                                    "max": Infinity,
                                    "color": "rgba(136, 16, 15, 0.8)",
                                    "label": ">5 observations"
                                }
                                
                            ],
                            "blue": [
                                {
                                    "min": 1,
                                    "max": 15,
                                    "color": "rgba(221, 244, 255, 0.5)",
                                    "label": "De 1 à 15 taxons"
                                },
                                {
                                    "min": 16,
                                    "max": 40,
                                    "color": "rgba(113, 191, 255, 0.8)",
                                    "label": "De 16 à 40 taxons"
                                },
                                {
                                    "min": 41,
                                    "max": 80,
                                    "color": "rgba(61, 98, 235, 0.8)",
                                    "label": "De 41 à 80 taxons"
                                },
                                {
                                    "min": 81,
                                    "max": Infinity,
                                    "color": "rgba(0, 15, 72, 0.8)",
                                    "label": ">80 taxons"
                                }
                                
                            ],
                            "orange": [
                                {
                                    "min": 1,
                                    "max": 2,
                                    "color": "rgba(255, 255, 169, 0.5)",
                                    "label": "De 1 à 2 taxons"
                                },
                                {
                                    "min": 3,
                                    "max": 5,
                                    "color": "rgba(253, 181, 56, 0.8)",
                                    "label": "De 3 à 5 taxons"
                                },
                                {
                                    "min": 6,
                                    "max": Infinity,
                                    "color": "rgba(228, 83, 0, 0.8)",
                                    "label": ">5 taxons"
                                }
                                
                            ]
                        },
                        legendSelector: function(){
                            if ($("input[data-target='indicateurs'][data-color='red']:checked").length) {
                                return "red";
                            } else if ( $("input[data-target='indicateurs'][data-color='blue']:checked").length ) {
                                return "blue";
                            } else if ( $("input[data-target='indicateurs'][data-color='orange']:checked").length ) {
                                return "orange";
                            } else if ( $("input[data-target='indicateurs'][data-color='brown']:checked").length ) {
                                return "brown";
                            } 
                            return "green";
                        },
                        style: function(feature, resolution, styleJson) {
                                var defaultStroke = new ol.style.Stroke({color: '#505050', width: 0.5});

                                for ( var i=0 ; i < styleJson.length ; i++) {
                                    var classe = styleJson[i];
                                    var min = classe['min'];
                                    var max = classe['max'];
                                    var rgba = classe['color'];
                                    if ( feature.get('total') >= min && feature.get('total') <= max ) {

                                        var fill = new ol.style.Fill({color: rgba});

                                        return [new ol.style.Style({
                                            fill: fill,
                                            stroke: defaultStroke,
                                            image: new ol.style.Circle({
                                                radius: 5,
                                                fill: fill
                                            })
                                        })];
                                    }
                                }

                                return defaultStyle;
                            }

                        }   
                });


    ofsaMap.addLayer('richessetaxo', Routing.generate('visu_carto_richesse_taxo_geojson'), {
        'title' : 'Richesse taxonomique',
        'queryable': true,
        'visibility': false,
        'legend': {
            legendJson: {
                "green": [
                    {
                        "min": 1,
                        "max": 10,
                        "color": "rgba(237, 248, 251, 0.5)",
                        "label": "De 1 à 10 taxons"
                    },
                    {
                        "min": 11,
                        "max": 100,
                        "color": "rgba(179, 205, 227, 0.8)",
                        "label": "De 11 à 100 taxons"
                    },
                    {
                        "min": 101,
                        "max": 300,
                        "color": "rgba(140, 150, 198, 0.8)",
                        "label": "De 101 à 300 taxons"
                    },
                    {
                        "min": 301,
                        "max": 500,
                        "color": "rgba(136, 86, 167, 0.8)",
                        "label": "De 301 à 500 taxons"
                    },
                    {
                        "min": 501,
                        "max": Infinity,
                        "color": "rgba(129, 15, 124, 0.8)",
                        "label": ">500 taxons"
                    }
                    
                ],
                "red": [
                    {
                        "min": 1,
                        "max": 2,
                        "color": "rgba(242, 204, 203, 0.5)",
                        "label": "De 1 à 2 taxons"
                    },
                    {
                        "min": 3,
                        "max": 5,
                        "color": "rgba(243, 131, 130, 0.8)",
                        "label": "De 3 à 5 taxons"
                    },
                    {
                        "min": 6,
                        "max": Infinity,
                        "color": "rgba(136, 16, 15, 0.8)",
                        "label": ">5 taxons"
                    }
                    
                ],
                "blue": [
                    {
                        "min": 1,
                        "max": 15,
                        "color": "rgba(221, 244, 255, 0.5)",
                        "label": "De 1 à 15 taxons"
                    },
                    {
                        "min": 16,
                        "max": 40,
                        "color": "rgba(113, 191, 255, 0.8)",
                        "label": "De 16 à 40 taxons"
                    },
                    {
                        "min": 41,
                        "max": 80,
                        "color": "rgba(61, 98, 235, 0.8)",
                        "label": "De 41 à 80 taxons"
                    },
                    {
                        "min": 81,
                        "max": Infinity,
                        "color": "rgba(0, 15, 72, 0.8)",
                        "label": ">80 taxons"
                    }
                    
                ],
                "orange": [
                    {
                        "min": 1,
                        "max": 2,
                        "color": "rgba(255, 255, 169, 0.5)",
                        "label": "De 1 à 2 taxons"
                    },
                    {
                        "min": 3,
                        "max": 5,
                        "color": "rgba(253, 181, 56, 0.8)",
                        "label": "De 3 à 5 taxons"
                    },
                    {
                        "min": 6,
                        "max": Infinity,
                        "color": "rgba(228, 83, 0, 0.8)",
                        "label": ">5 taxons"
                    }
                    
                ]
            },
            legendSelector: function(){
                if ($("input[data-target='indicateurs'][data-color='red']:checked").length) {
                    return "red";
                } else if ( $("input[data-target='indicateurs'][data-color='blue']:checked").length ) {
                    return "blue";
                } else if ( $("input[data-target='indicateurs'][data-color='orange']:checked").length ) {
                    return "orange";
                } else if ( $("input[data-target='indicateurs'][data-color='brown']:checked").length ) {
                    return "brown";
                } 
                return "green";
            },
            style: function(feature, resolution, styleJson) {
                    var defaultStroke = new ol.style.Stroke({color: '#505050', width: 0.5});

                    for ( var i=0 ; i < styleJson.length ; i++) {
                        var classe = styleJson[i];
                        var min = classe['min'];
                        var max = classe['max'];
                        var rgba = classe['color'];
                        if ( feature.get('total') >= min && feature.get('total') <= max ) {

                            var fill = new ol.style.Fill({color: rgba});

                            return [new ol.style.Style({
                                fill: fill,
                                stroke: defaultStroke,
                                image: new ol.style.Circle({
                                    radius: 5,
                                    fill: fill
                                })
                            })];
                        }
                    }

                    return defaultStyle;
                }

            }   
    });


    $(".select2").select2({
        placeholder: $(this).attr("placeholder"),
        style: $(this).attr("style"),
        allowClear: true
    });

    $(".layer-info img")
    .mouseenter(function(){
        $(this).parents().children('.layer-activate').css('display', 'block');
    })
    .mouseout(function(){
        $(this).parents().children('.layer-activate').css('display', 'none');
    });


    //Gestion de la légende
    /* création de l'élément 'légende' */
    var divMapLegend = $('#control-legende')
    .addClass('ol-unselectable ol-control')
    .removeClass('hide');
    var divMapLegendControl = new ol.control.Control({
        element: divMapLegend[0]
    }).setMap(map);


    /*******************************************************************/  
    /*********************** Zoom sur commune **************************/
    /*******************************************************************/

    /* création de l'élément 'Recherche commune' */
    var divFlyToCom = $('#control-fly-to-commune')
    .addClass('controlFlyToCom ol-unselectable ol-control')
    .removeClass('hide');
    var divFlyToComControl = new ol.control.Control({
        element: divFlyToCom[0]
    }).setMap(map);

    var xhr_communes;

    var autocompleteVectorSource = new ol.source.Vector({format: formatGeoJSON });
    var autocompleteVector = new ol.layer.Vector({
            source: autocompleteVectorSource,
            'queryable': false,
            'displayInLayerSwitcher' : false,
            visible: true,
            style: new ol.style.Style({
                    fill: new ol.style.Fill({
                            color: [255,255,255,0]
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#FF530D',
                        lineDash: [2, 6],
                        width: 3
                    })
            })
    });
  
    map.addLayer(autocompleteVector);

    $('#fly-to-commune').typeahead({
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

            if( typeof(xhr_communes) !== 'undefined' ) {
                xhr_communes.abort();
            }
            
            xhr_communes = $.ajax({
                url: Routing.generate('visu_consultation_commune_autocomplete') + '/' + query,
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
        $(this).typeahead('val', '');
        
        // Affiche la géométrie de la commune
        autocompleteVectorSource.clear();
        
        var f = new ol.format.GeoJSON();
        var geom = f.readGeometry(suggestion.geojson);
        var olFeature = new ol.Feature(geom);
        
        autocompleteVectorSource.addFeature( olFeature );
        
        // Zoom sur la commune avec la BBOX
        var extent = geom.getExtent();

        map.getView().fit(extent, {
            size: map.getSize(),
            duration: 2000
        });        
    });

    //gestion du formulaire fiche commune
    $(document).on('submit', '#fmr_fiche_comm', function(e)
    {
        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        $.ajax(
        {
            url : formURL,
            type: "POST",
            data : postData,
            beforeSend: function() {
                
            },
            success:function(data, textStatus, jqXHR) 
            {
                $('#fiche-comm-content').html(data);
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
                //if fails      
            }
        });

        e.preventDefault(); //STOP default action
    });

    //input de recherche d'un taxon et d'affichage de sa fiche espece
    $('#search_taxon').OPNATypehead({
        target: '.results-taxo-complete',
        minChar: 2,
        url: Routing.generate('visu_taxon_html') + '?term=',
        elementSelector: "#liste-flore p:not('.nom_vern')",
        onSelect: function(e){
            var tax = e.parents('li.li-groupe').find('li.li-valide');
            var taxon = {'cd_ref':tax.attr('data-ref'), 'nom_complet':tax.attr('data-name')};
            addFicheEspece(taxon);
            $('#search_taxon').val('');
        }
    });

    var repartitionStyleJSON = {
                            "historique": {
                                "color": "rgba(88, 41, 0, 0.8)",
                                "label": "Données historiques (<1950)"
                            },
                            "ancienne": {
                                "color": "rgba(166, 123, 44, 0.8)",
                                "label": "Données anciennes (≥1950 - <2000)"
                            },
                            "recente": {
                                "color": "rgba(130, 202, 82, 0.8)",
                                "label": "Données récentes (≥2000)"
                            },
                            "non_traitee": {
                                "color": "rgba(200, 200, 200, 0.8)",
                                "label": "Données en attente de validation"
                            }
                        };

    var repartitionStyleFunction = function(feature, resolution, jsonInUse) {

                                var defaultStroke = new ol.style.Stroke({color: '#505050', width: 0.5});

                                var rgba = jsonInUse['non_traitee']["color"];

                                if ( feature.get('validation') == 0) {
                                    rgba = jsonInUse['non_traitee']["color"];
                                } else if ( feature.get('annee_max') >= 2000) {
                                    rgba = jsonInUse['recente']["color"];
                                } else if ( feature.get('annee_max') >= 1950 ) {
                                    rgba = jsonInUse['ancienne']["color"];
                                } else {
                                    rgba = jsonInUse['historique']["color"];
                                }

                                return [new ol.style.Style({
                                            fill: new ol.style.Fill({
                                                        color: rgba}),
                                            stroke: defaultStroke,
                                        })];
                        };

    //Affichage repartition taxo
    var fe_count = 0;
    function addFicheEspece(taxon){

        var idLayer = 'repartEsp_'+fe_count;
        ofsaMap.addLayer(idLayer, Routing.generate('visu_carto_taxon_repartition_geojson', {'cd_ref':taxon.cd_ref}), {
                    'title' : taxon.nom_complet,
                    'queryable': true,
                    'visibility': true,
                    'legend': {
                        legendJson: repartitionStyleJSON,
                        style: repartitionStyleFunction
                    }
                });

        var layer = ofsaMap.getLayer(idLayer);

        var $div = $('<div>');
        var $remove = $('<span>')
                      .attr('title', 'Supprimer définitivement la donnée')
                      .addClass('glyphicon glyphicon-remove')
                      .click(function(){
                            ofsaMap.removeLayer(idLayer);
                            $div.remove();
                        });

        var $refresh = $('<span>')
                      .attr('title', 'Recharger la donnée')
                      .addClass('glyphicon glyphicon-refresh')
                      .click(function(){
                            layer.olLayer.setVisible(true);
                            ofsaMap.reloadLayer(idLayer);
                        });

        var $label = $('<span>').html('<strong>'+taxon.nom_complet+'</strong>');
        var $fe = $('<a>').addClass('bt-obsion-fiche')
                             .attr('title', 'Accéder à la fiche du taxon')
                             .attr('href', 'http://outils.gretia.org/taxref/taxon/'+taxon.cd_ref)
                             .attr('target', '_BLANK')
                             .html('<span class="glyphicon glyphicon-piggy-bank"></span>');

        $div.append($remove).append($refresh).append($label).append($fe);
        $("#lst-taxon").append($div);

        fe_count++
    }



    //gestion de l'event clic sur un filtre pour cocher par defaut un indicateur si aucun n'est coché
    $('[name="filtres[]"][data-target="indicateurs"]').click(function(){
        if ($('[name="indicateurs"]:checked').length == 0) {
            $('[name="indicateurs"][data-layer="richessetaxo"]').prop('checked', true);
            var layer = ofsaMap.getLayer('richessetaxo');
            layer.olLayer.setVisible(true);
        }
    });
 
 

    /****
    *
    *   Ajout de la couche des périmètres des territoires
    *
    ****/
    var perimetreTerriSource = new ol.source.Vector({format: formatGeoJSON });
    var perimetreTerriLayer = new ol.layer.Vector({
                        title: 'Périmètres des territoires', 
                        source: perimetreTerriSource, 
                        queryable: false,
                        style: [new ol.style.Style({
                                    stroke: new ol.style.Stroke({color: '#FF4000', width: 3})
                                })],
                        visible: true
                  });
    map.addLayer(perimetreTerriLayer);

    //gestion de l'action de la ZL natura2000 pour afficher la carto adéquate
    $("input[name='territoire[]']").change(function(){
        var tabTerri = new Array();
        $("input[name='territoire[]']:checked").each(function(idx){
            tabTerri[idx] = $(this).val();
        })

        if ( tabTerri.length ) //si > 0 -> true sinon false
        {
            $.ajax({
                url: Routing.generate('visu_carto_territoire_geojson'),
                method: 'POST',
                data: $("[name='territoire[]']").serializeArray(),
                beforeSend: function() {
                    $("#load-maplayer").removeClass('hide');
                    perimetreTerriSource.clear();
                },
                success: function(data) {
                    perimetreTerriSource.clear();
                    perimetreTerriSource.addFeatures(formatGeoJSON.readFeatures(data));
                    map.getView().fit(perimetreTerriSource.getExtent(), map.getSize());
                    $("#load-maplayer").addClass('hide');
                },
                error: function(){
                    $("#load-maplayer").addClass('hide');
                }
            });  
        }   
    });


    /***
    *   Fonction qui permet de désactiver la restitution précise si aucun filtre territoire n'est appliqué
    **/
    $('.showPopover').popover({ trigger: 'hover', placement: 'auto'});

    $("[name='territoire[]']").click(function(){
        //si au moins un territoire est coché on active la restitution precise, sinon on la bloque
        if ($("[name='territoire[]']:checked").length) {
            $("#ls_precise").prop("disabled", false);
            $("#info_precise").addClass("hide");
        } else {
            $("#ls_precise").prop("disabled", true);
            $("#info_precise").removeClass("hide");
        }
    });



    /***
    *   Fonction qui initialise une couche ol dans l'appli.
    *
    *   params : layer = {id : identifiant de la couche utilisé dans la def du style et pour la mise à jour de la donnée,
    *                     title : Nom de la couche utilisé pour les IB,
    *                     style : Objet ol contenant la définition des styles pour la couche
    *                    }
    ***/

});