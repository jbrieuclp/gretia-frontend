$(function() {

    /** Menu Index **/
    if ( $("#nav-summary").length ) {
		$('#nav-summary').affix({
	          offset: {
	            top: $('#nav-summary').offset().top -80
	          }
	    }); 

	    $('#nav-side-bar > li > a').click(function(event) {
	        $('#nav-side-bar > li').removeClass('active');
	        $(this).parent('li').addClass('active');
	        var $anchor = $(this);
	        var offset = $($anchor.attr('href')).offset().top -80;
	        $('html, body').stop().animate({
	            scrollTop: offset
	        }, 'fast');
	        event.preventDefault();
	    });

	    $('body').scrollspy({target: ".form-index"});


	    $('#nav-side-bar > li').on('activate.bs.scrollspy', function(event) {
			$('body').data()['bs.scrollspy'].options.offset = 95; // Set the new offset 
			$('body').data()['bs.scrollspy'].process(); // Force scrollspy to recalculate the offsets to your targets 
			$('body').scrollspy('refresh'); // Refresh the scrollspy
	        if ( typeof($('#nav-side-bar > li a:focus')[0]) != 'undefined' 
	                    && $($('#nav-side-bar > li a:focus')[0]).attr('href') != $($(this).find('a')[0]).attr('href') ) {
	            $('#nav-side-bar > li').removeClass('active');
	            $($('#nav-side-bar > li a:focus')[0]).parent('li').addClass('active');
	        }
	        $($('#nav-side-bar > li a:focus')[0]).blur();
	    });
	}

	//initialisation de la mise en page des beandeau verticaux au chargement et en fonction de l'event scroll
/*	setHauteurBandeauV();
	$(window).scroll(function() {
		setHauteurBandeauV()
	});

	function setHauteurBandeauV() {
		var hauteur = 180 - $(window).scrollTop() + 45;
		if (hauteur > 180) {
			hauteur = 180;
		} else if (hauteur < 55 ) {
			hauteur = 55;
		}
		$("#bandeaux-verticaux .bv").css('height', hauteur);
	}
*/

 	$('[data-toggle="tooltip"]').tooltip(); 
	/* 
	****
	Navbar  
	****
	*/

	$('ul.navbar .dropdown').click( function(event){
        event.stopPropagation();
        if ($(this).hasClass('open')) {
        	$(this).removeClass('open');
        }else {
        	$("ul.navbar .dropdown").removeClass('open');
			$(this).addClass('open');
        }
    });

   	$("ul.nav > li.dropdown").click( function(){
		$("ul.nav > li.dropdown > ul.dropdown-menu > li.dropdown-submenu > a.subm").removeClass('open');
		$("ul.nav > li.dropdown > ul.dropdown-menu > li.dropdown-submenu > ul.dropdown-menu").css("display", "none");
   	});

	$('#nav-toggle').click(function(){
		$('#nav-icon').toggleClass('open');
	});


    $('.dropdown-submenu a.subm').on("click", function(e){
		$(this).next('ul').toggle();
		e.stopPropagation();
		e.preventDefault();
		if ($(this).hasClass('open')) {
        	$(this).removeClass('open');
        }else {
			$(this).addClass('open');
        }

	});

    //necessaire pour gerer les lien apres un sous-menu
	$('.dropdown-submenu .dropdown-menu a.link').on("click", function(e){
		e.stopPropagation();
	});

    $(document).click( function(){
        $("ul.navbar .dropdown, .dropdown-submenu a.subm").removeClass('open');
        $(".dropdown-submenu ul.dropdown-menu").css("display", "none");
    });

    $(document).on("mouseenter", ".toolbox-info img", function(){
        $(this).parents(".toolbox-info").children('.ss-bloc').css('display', 'block');
    })
    .on("mouseout", ".toolbox-info img", function(){
        $(this).parents(".toolbox-info").children('.ss-bloc').css('display', 'none');
    });

	//gestion des onglets
	$(document).on("click", "#tabs a", function(event){
		event.preventDefault();
    	var onglet = $(this).attr('href');
    	$("#tabContent > div").fadeOut('200');
    	$("#tabs li").attr('id', '');
    	$(this).parent().attr('id', 'current');
    	setTimeout(function(){
	    	$(onglet).fadeIn('200');
		}, 200);
    });

    /**
    * Gestion du déplacement des modal bootstrap = necessite jquery ui
    **/
    $(".modal-content").draggable({
	    handle: ".modal-header"
	});
});

