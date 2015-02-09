//= require classie

// functions
function deployMenu(body,menuLeft, showLeftPush){
	showLeftPush.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( body, 'cbp-spmenu-push-toright' );
		classie.toggle( menuLeft, 'cbp-spmenu-open' );
		//disableOther( 'showLeftPush' );
	};
}

function onMenuResize(){
	var _windowheight = $(window).height();
	var _navHeight = $('.navbar').height();
	var _viewportHeight = _windowheight - _navHeight;

	$('.cbp-spmenu').css('height', _viewportHeight);
	$('.dashholder').css('min-height', _viewportHeight)
}
// Launch stuffs
$(document).ready(function() {

	$( 'body' ).on('click', '.cbp-spmenu-trigger', function(e){
		$('.leftmenuholder').toggleClass('hide');
		$('.dashholder').toggleClass('col-md-9');
		$('.dashholder').toggleClass('col-md-12');
	});

	$(window).resize(function(){onMenuResize();});
	onMenuResize();

});