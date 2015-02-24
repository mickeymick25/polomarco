function onMenuResize(){
	var _windowheight = $(window).height();
	var _navHeight = $('.navbar').height();
	var _viewportHeight = _windowheight - _navHeight;

	$('.wrapper').css('min-height', _viewportHeight)
}
// Launch stuffs
$(document).ready(function() {

	$(window).resize(function(){onMenuResize();});
	onMenuResize();

});