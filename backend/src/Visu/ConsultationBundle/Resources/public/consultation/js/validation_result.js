$(function(){
	"use strict"

	$(document).on('click', '[data-toggle="horizontal-collapse"]', function(){
		var parent = $(this).parents(".horizontal-panel-group");
		console.log(parent);
		console.log(parent.find(".collapse"));
		parent.find(".collapse").removeClass("in");
		var target = $(this).attr("data-target");

		var largeur_in = $(".horizontal-panel-group").width() - ($(".horizontal-panel-collapse").length * $(".horizontal-panel-collapse").width());

		$(target).css('max-width', largeur_in);
		$(target).addClass('in');
		$(target).animate({width: 'toggle'});
	});
});