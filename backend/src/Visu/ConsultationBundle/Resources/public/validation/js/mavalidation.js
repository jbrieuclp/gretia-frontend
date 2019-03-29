$(function(){
	"use strict"

	$("form[name='fmr-reindex']").submit(function(event){
		event.preventDefault();
		var that = this;
		var postData = $(this).serializeArray();

    	$.ajax({
        	url: $(this).attr("action"),
	        method: 'POST',
	        'that': that,
	        data: postData,
	        beforeSend: function() {
	            $(that).parents('.row').addClass('waiting');
	        },
	        success: function(data) {
	        	console.log(data);
	        	if (data) {
	        		$(that).parents('.row').removeClass('waiting');
	        		$(that).parents('.row').addClass('good');
	        	} else {
	        		$(that).parents('.row').removeClass('waiting');
	        		$(that).parents('.row').addClass('error');
	        	}
	        },
	        error: function(){
	        	$(that).parents('.row').removeClass('waiting');
	        	$(that).parents('.row').addClass('error');
	        }
	    });
	});


	/**
	* Gestion de la liste deroulante des taxons
	*/

    var xhr;

    var typeahead = $('.zt_taxon').typeahead({
        hint: false,
        highlight: true,
        minLength: 3
    },
    {
        name: 'taxon',
        limit: Infinity, // Attention ici, bug de l'API. Si on met une limite et que le nombre de résultats est inférieur à cette limite, seule le premier résultat sera retourné... Solution trouvée : Infinity ici, et c'est le serveur qui limite le nombre de réponse
        async: true,
        display: function(suggestion) {
            return suggestion.nom_complet;
        },
        // source des résultats. Dans notre cas, AJAX donc on renvoie la variable asyncResults 
        source: function ( query, syncResults, asyncResults ) {

            if( typeof(xhr) !== 'undefined' ) {
                xhr.abort();
            }

            xhr = $.ajax({
                url: '/silex.php/silex/taxon/recherche/'+query,
                dataType: 'json'
            }).success( function(data) {
                // c'est la façon de procéder... on obéit //
                asyncResults( data );
            });
        },
        // modifie le template d'un item de liste //
        templates: {
            suggestion: function (data) {
            	var row;
            	if (data.cd_nom_ref) {
            		row = '<div data-id="'+ data.cd_nom +'" class="tt-suggestion tt-selectable"><strong>' + data.nom_complet + '</strong></div>';
            	} else {
            		row = '<div data-id="'+ data.cd_nom +'" class="tt-suggestion tt-selectable">' + data.nom_complet + '</div>';
            	}

            	return row;
	        },
	        pending: '<div class="loading load1"></div>',
	        notFound: '<div>Aucune taxon correspondant</div>'
        }
    });
   
    

    var typeaheadselected = false;
    // modifie le comportement lors d'un select de l'item //
    typeahead.bind('typeahead:selected typeahead:autocomplete', function(ev, suggestion) {
    	$(this).typeahead('val', suggestion.nom_complet);
        $(this).parents('form').find('input[name="cd_nom"]').val(suggestion.cd_nom);
    });

 
    /**
	* FIN Gestion de la liste deroulante des taxons
	*/
});