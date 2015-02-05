// Partners carousel
$(document).ready(function() {
	$(".partners-slider").owlCarousel({
		autoPlay: 8000,
		items: 5,
		pagination: false,
		itemsDesktop: [1000, 1],
	    itemsDesktopSmall: [900, 1],
	    itemsTablet: [600, 1],
	    itemsMobile: false
	});
});