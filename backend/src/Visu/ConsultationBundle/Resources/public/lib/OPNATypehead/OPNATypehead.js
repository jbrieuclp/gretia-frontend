jQuery.fn.OPNATypehead = function(arg){
    
    var param = {
        before : null,
        target : 'body',
        minChar : 0,
        url: null,
//        width: 600,
//        height: 'auto',
        onSelect : null,
        onChange: null,
        onHover : null,
        elementSelector: null
    }; // on définit les paramètres et leurs valeurs par défaut

    var timer;
    var xhr = new Array();
    var elements = new Array();
    var compteur;

    var selector = this[0]; //juste le premier resultat


    param = $.extend(param, arg); // on fusionne l'argument et l'objet

    
    $(selector).keyup( function( event ) {

        event.preventDefault();

        if ( event.which != 13 && event.which != 38 && event.which != 40 && event.which != 37 && event.which != 39) {
            
            //before
            if(param.before){ // si un callback existe
                param.before(); // on lance la fonction
            }

            var autocompletionBox = $(param.target);

            var val = $(this).val();
            if ( val.length >= param.minChar ) {
                    
                // Taille de la liste absolute en fonction de la taille de la ligne (row) pour le responsive
            //    var rowWidth = 1 * autocompletionBox.parents('.row').innerWidth() - 30; // 30 pour les marges des colonnes externes
                autocompletionBox.css('width','100%');
                
                // Affichage de la liste
                autocompletionBox.find('.content').empty();
                autocompletionBox.removeClass('hide');
                autocompletionBox.find('.loading').removeClass('hide');


                // Timer de 600ms avant que ne s'exécute tout le reste
                window.clearTimeout(timer);
                timer = window.setTimeout(function(){

                    if( xhr[xhr.length - 1]) 
                    {
                        xhr[xhr.length - 1].abort();
                    }
            
            
                    xhr[xhr.length] = $.ajax({
                        url: param.url + val,
                        dataType: 'html'
                    }).success( function(html) {
                        autocompletionBox.find('.loading').addClass('hide');
                        autocompletionBox.find('.content').html(html);
                        elements = $(param.elementSelector);

                        if(param.onSelect){ // si une fonction onSelect existe
                            $(param.elementSelector).click(function(e){
                                //on gère le click sur les élément cliquable
                                param.onSelect($(this)); // on lance la fonction
                                $(param.target).addClass('hide');
                            })
                        }
                        compteur = null; //reinitialisation
                    });
                        
                }, 600);
            }
        }
    }).keydown( function( event ) {
        if ( event.which == 40 ) { // keyDown
            //il faut decrementer le compteur de deux pour retomber sur la valeur précédente
            incCompteur();
            var $item = $(elements[getCompteur()]);
            setCurrent($item);
        
        } else if ( event.which == 38 ) { // keyUp
            decCompteur();
            var $item = $(elements[getCompteur()]);
            setCurrent($item);
        
        } else if ( event.which == 13 || event.which == 9 ) { // Enter ou tab
            event.preventDefault();
            $(param.target).addClass('hide');

            //before
            if(param.onSelect){ // si une fonction onSelect existe
                param.onSelect($(elements[getCompteur()])); // on lance la fonction
                $(param.target).addClass('hide');
            }
        }
            
            
    });

    if(param.onChange){ // si une fonction onSelect existe
        $(this).change(function(){
            param.onChange($(this));
        });
    }

    $(param.target)
    .click(function(){
        $(selector).focus();
    });

    $('html').not(param.target).click(function(event){
        if ( !$(event.target).parents(param.target).length && !$(event.target).is(this)) {
            $(param.target).addClass('hide');
        }
    });


    function setCurrent(e) {
        //reset
        $(param.target+' li.li-groupe').removeClass('current');
        $(param.target+' li.li-groupe li').removeClass('current');
        //affichage
        e.parent('li').addClass('current');
        e.parents('li.li-groupe').addClass('current');
        //scroll
        if (typeof(e.position()) != 'undefined') {
            $(param.target).animate({
                scrollTop: e.position().top - 100
            }, 100);
        }
        //valeur
        //before
        if(param.onHover){ // si une fonction onSelect existe
            param.onHover(e); // on lance la fonction
        }
    }


    function incCompteur() {
        //on teste si l'augmentation du compteur depasserait la dimension du tableau
        if ( compteur === null ) {
            compteur = 0;
        } else if (elements.length > compteur+1) {
            compteur++;
        } else {
            return true;
        }
        return true;
    }

    function decCompteur() {
        if ( compteur === null ) {
            compteur = 0;
        } else if (compteur-1 >= 0) {
            compteur--;
        } else {
            return true;
        }
        return true;
    }

    function getCompteur() {
        return compteur;
    }

    return this; // on ne casse pas la chaîne !
};