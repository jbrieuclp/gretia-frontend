jQuery.fn.OFSADBox = function(arg){
    var param = {
        masque : true,
        draggable : true,
        resizable : true,
        width: 600,
        height: 'auto',
        callback : null
    }; // on définit les paramètres et leurs valeurs par défaut

    function close(e) {
        e.remove();
        $("body").css({'overflow':'auto'});
    }

    param = $.extend(param, arg); // on fusionne l'argument et l'objet

    this.each(function(idx, e){
        //container qui est ajouté au body
        var $container = $('<div class="ofsadbox-overlay">');

        if(param.callback){ // si un callback existe
            param.callback(); // on lance la fonction
        }

        $(e).css('width', param.width);
        $(e).css('height', param.height);
        $(e).css('left', ($(window).width() - param.width) / 2 );

        if(param.masque){ // si un masque doit être affiché
            var $masque = $('<div class="ofsadbox-masque">');
            $masque.click(function(){close($container);});
            //on ajoute le masque au container
            $container.append($masque);
            $("body").css({'overflow':'hidden'});
        }

        // si un masque doit être affiché
        if(param.draggable){ 
            $(e).draggable({
                handle: ".ofsadbox-dlg-header",
                appendTo: $container,
                start: function(event, ui) {
                    isDraggingMedia = true;
                },
                stop: function(event, ui) {
                    isDraggingMedia = false;
                    // blah
                }
            }); 
        }

        // si on permet de redimensionner
        if(param.resizable){ 
            $(e).resizable({
                minHeight: 100,
                resize: function( event, ui ) {
                    $(e).find('.ofsadbox-dlg-body').css('maxHeight', $(e).outerHeight()-$(e).find('.ofsadbox-dlg-header').outerHeight()-32);
                }
            }); 
        }

        //suppression de la box au clic sur la coirx de fermeture
        $(e).find('.close').click(function(){ close($container); });

        $container.append(this);
        $("body").append($container);
        $(e).css('top', ($(window).height() - $(e).outerHeight()) / 3 );
        
    });

    return this; // on ne casse pas la chaîne !
};