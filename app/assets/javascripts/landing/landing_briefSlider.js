// Brief carousel
$(document).ready(function() {
	$(".small-slider").owlCarousel({
		items: 1,
		navigation: true,
		navigationText: [
			"<i class='fa fa-angle-left btn-slide'></i>",
			"<i class='fa fa-angle-right btn-slide'></i>"
			],
		pagination: false,
		itemsDesktop: [1000, 1],
	    itemsDesktopSmall: [900, 1],
	    itemsTablet: [600, 1],
	    itemsMobile: false
	});
});