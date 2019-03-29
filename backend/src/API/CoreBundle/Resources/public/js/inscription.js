$(function(){
	$("#user_geo_nature_password2").change(function(){
		if ( $("#user_geo_nature_password").val() !== $("#user_geo_nature_password2").val() ) {
			$("#user_geo_nature_password").val('');
			$("#user_geo_nature_password2").val('');
		}
	})
})