// Testemonial carousel
$(document).ready(function() {	
	$(".testemonials").owlCarousel({
		autoPlay: 8000,
		autoHeight : true,
		singleItem: true,
		navigation: false,
		itemsDesktop: [1000, 1],
        itemsDesktopSmall: [900, 1],
        itemsTablet: [600, 1],
        itemsMobile: false
	});
});