$(function(){
	"use strict"

    $('body').css("overflow-y", "hidden");

    $(".close-result").click(function(){
        $(".bloc-resultat").remove();
        $('body').css("overflow-y", "auto");
    });

    $(".bloc-resultat .glyphicon-question-sign").click(function(){
        $("#modal_documentation").modal('show');
    });

/*    $("#table_datas").dynatable(dynatableOptions);

    $("#table_datas").dynatable().on("dynatable:afterUpdate", function(){
        setPopover();
    });*/

    /**
    *   Gestion du datatables
    **/

    var datatables_releve = $('#table_releves').DataTable( {
        "scrollY":        "65vh",
        "scrollCollapse": true,
        "paging":         true,
        "pageLength": 25,
        "language": datatables_config.language,
        "columnDefs": [
            {
                "targets": [ 8, 9, 10 ],
                "visible": true,
                "searchable": false
            }
        ]
    } );

    var datatables_taxon = $('#table_taxons').DataTable( {
        "scrollY":        "65vh",
        "scrollCollapse": true,
        "paging":         true,
        "pageLength": 25,
        "language": datatables_config.language,
        "columnDefs": [
            {
                "targets": [ 2, 3 ],
                "visible": true,
                "searchable": false
            },
            {
                "targets": [ 4 ],
                "visible": true,
                "searchable": true
            }
        ]
    } );

    $('div.col-toggle-vis input[type="checkbox"]').on( 'change', function (e) {
        // Get the column API object
        var column = datatables_releve.column( $(this).val() );
 
        // Toggle the visibility
        column.visible( $(this).prop("checked") );
    } );

    /**
    *   Fin gestion du datatables
    **/

    //ouvrir modal de liste des observations
    $(document).on('click', '#table_releves img.feuille_obs', function(){
        $.ajax({
            url: $(this).attr('data-url'),
            beforeSend: function() {
                $("#modal_data_obs_content").html('<div class="text-center"><p><img src="/bundles/visuconsultation/carto/images/icones/load-model.svg"></p></div>');
                $("#modal_data_obs").modal('show');
            },
            success: function(data) {
                $("#modal_data_obs_content").html(data);
            },
            error: function(){
                $("#modal_data_obs_content").html('<div>Une erreur est survenue<div>');
            }
        });  

    });

    //ouvrir modal de liste des releves
    $(document).on('click', '#table_taxons img.list-releve', function(){
        var rids = $(this).parents('tr').find('td[data-name="rids"]').text();
        $.ajax({
            url: Routing.generate('ofsa_consultation_releve_from_taxon'),
            data: {'rids': rids},
            method: 'POST',
            beforeSend: function() {
                $("#modal_data_rel_content").html('<div class="text-center"><p><img src="/bundles/visuconsultation/carto/images/icones/load-model.svg"></p></div>');
                $("#modal_data_rel").modal('show');
            },
            success: function(data) {
                $("#modal_data_rel_content").html(data);
            },
            error: function(){
                $("#modal_data_rel_content").html('<div>Une erreur est survenue<div>');
            }
        }); 
    });



    //activation des popovers
    setPopover();

    //dimensionnement de la carto de resultats
    resizeMapResult();

    $(window).resize(function(){
        resizeMapResult();
    })

    function setPopover() {
        $('[data-toggle="popover"]').popover({
            trigger:'hover',
            content: function(){
                return $(this).find('span.popover-content').html();
            },
            html: true,
            placement:'right'
        });
    }

    function resizeMapResult() {
        var height = $(".bloc-resultat").outerHeight()-80;
        $("#map_result").height(height);
        map_result.setSize([$("#map_result").width(), height]);
    }

    var resultStyle = (function() {

        var stroke = new ol.style.Stroke({
                          color: 'rgba(235, 107, 16, 1)',
                          width: 1
                        });

        var fill = new ol.style.Fill({
                          color: 'rgba(239, 196, 24, 0.8)'
                        });

        var image = new ol.style.Circle({
                        radius: 5,
                        fill: fill
                    });

        var normal = new ol.style.Style({
                        fill: fill,
                        stroke: stroke,
                        image: image
                    });

        var point = new ol.style.Style({
                        image: image,
                        geometry: function(feature) {
                            // return the coordinates of the first ring of the polygon
                            var coordinates = feature.getGeometry().getCoordinates()[0];
                            if ( feature.getGeometry().getType() == 'LineString' ) {
                                return new ol.geom.Point(coordinates);
                            } else {
                                return new ol.geom.MultiPoint(coordinates);
                            }
                        }
                    });


        return function(feature, resolution) {
            if (feature.getGeometry().getType() != 'Point' && resolution > 50 ) {
               return [point]
            } else {
                return [normal];
            }
        };

    })();

    var selectStyle = (function() {

        var stroke = new ol.style.Stroke({
                          color: 'rgba(255, 128, 0, 1)',
                          width: 2
                        });

        var fill = new ol.style.Fill({
                          color: 'rgba(255, 128, 0, 0.8)'
                        });

        var image = new ol.style.Circle({
                        radius: 7,
                        fill: fill
                    });

        var normal = new ol.style.Style({
                        fill: fill,
                        stroke: stroke,
                        image: image,
                        zIndex: 1000
                    });

        var point = new ol.style.Style({
                        image: image,
                        geometry: function(feature) {
                            // return the coordinates of the first ring of the polygon
                            var coordinates = feature.getGeometry().getCoordinates()[0];
                            //necessaire pour resoudre un bug d'affichage avec les lignes
                            if ( feature.getGeometry().getType() == 'LineString' ) {
                                return new ol.geom.Point(coordinates);
                            } else {
                                return new ol.geom.MultiPoint(coordinates);
                            }
                        },
                        zIndex: 1000
                    });


        return function(feature, resolution) {
            if (feature.getGeometry().getType() != 'Point' && resolution > 50 ) {
               return [point]
            } else {
                return [normal];
            }
        };

    })();

    var format = new ol.format.GeoJSON({projection: new ol.proj.get('EPSG:3857')});
	var resultSource = new ol.source.Vector({
							format: format
						});

    var resultLayer = new ol.layer.Vector({
                        title: 'Résultat de la sélection', 
                        source: resultSource, 
                        queryable: true,
                        style: resultStyle,
                        visible: true
                  });
    map_result.addLayer(resultLayer);
    $.ajax({
        url: Routing.generate('ofsa_consultation_resultat_geojson'),
        data: $("#fmr_consultation").serializeArray(),
        method: 'POST',
        beforeSend: function() {
            $("#load-maplayer").removeClass('hide');
            resultSource.clear();
        },
        success: function(data) {
            resultSource.clear();
            resultSource.addFeatures(format.readFeatures(data, {dataProjection: 'EPSG:3857', featureProjection:'EPSG:3857'}));
            map_result.getView().fit(resultSource.getExtent(), map_result.getSize());
            $("#load-maplayer").addClass('hide');
        },
        error: function(){
            $("#load-maplayer").addClass('hide');
        }
    });  

    /**
    *   Interaction pour selctionner les points sur la carto
    */
    var select = new ol.interaction.Select({
                            layers: [resultLayer],
                            wrapX: false,
                            style: selectStyle
                });
    //make sure you add select interaction to map
    map_result.addInteraction(select);

    var selectedFeatures = select.getFeatures();


    select.on('select', function(evt){
        if (evt.selected.length) {
            var feature = evt.selected[0];
            //column 0 = rel_id
            datatables_releve.columns(0).search(feature.getProperties().rel_id).draw();
            //columns 4 = rel_ids
            console.log(datatables_taxon.columns());
            datatables_taxon.columns(4).search(feature.getProperties().rel_id).draw();
        } else {
            datatables_releve.columns(0).search('').draw();
            datatables_taxon.columns(4).search('').draw();
        }
    });


    $('.datatable tbody').on('click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            $('.datatable tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        highlightFeature();
    });

    function highlightFeature() {
        selectedFeatures.clear();
        $('.datatable tr.selected').each(function(i, e) {
            var rids = JSON.parse($(e).find('td[data-name="rids"]').text());
            if ( !Array.isArray(rids)) { rids = [rids]; }
            resultSource.forEachFeature(function(f){
                if ($.inArray( f.getProperties().rel_id, rids ) != -1) {
                    selectedFeatures.push(f);
                } 
            });
        });
    }

});