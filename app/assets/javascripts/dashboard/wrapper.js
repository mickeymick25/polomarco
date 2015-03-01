$.ajax({
   type: "GET",
   contentType: "application/json; charset=utf-8",
   url: 'dashboard/data',
   dataType: 'json',
   success: function (data) {
       draw(data);
   },
   error: function (result) {
       error();
   }
});
 
function draw(data){
	
	<!-- Chart Map Appartement -->
	var chart_appart = drawfloormap();

	<!-- Chart Temperature -->
	var chart_temp = c3.generate({
		bindto: '#temperature',
    	padding: {
	        top: 0,
	        right: 0,
	        bottom: 0,
	        left: 20,
    	},
    	data: {
	        columns: [
	            ['Temperature', 18, 19, 22, 18, 19, 17]
	        ],
	        type: 'area-spline',
	        colors: {
	        	Temperature: '#ff9c00'
	        }
	    },
	    legend: {
        	show: false
    	}
	});

	<!-- Chart Humidite -->
	var chart_humd = c3.generate({
		bindto: '#humidite',
		padding: {
	        top: 0,
	        right: 0,
	        bottom: 0,
	        left: 20,
		},
		data: {
	        columns: [
	            ['humidite', 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250],
	        ],
	        type: 'bar',
	        colors: {
	        	humidite: '#ff9c00'
	        }
	    },
	    legend: {
        	show: false
    	},
	    bar: {
	        width: {
	            ratio: 0.5 // this makes bar width 50% of length between ticks
	        }
	        // or
	        //width: 100 // this makes bar width 100px
	    }
	});

	<!-- Chart Acoustique -->
	var chart_acou = c3.generate({
		bindto: '#acoustique',
		padding: {
	        top: 0,
	        right: 0,
	        bottom: 0,
	        left: 20,
		},
		data: {
	        columns: [
	            ['Acoustique', 9, 2, 21, 8, 42, 24, 13, 21]
	        ],
	        type: 'area-step',
	        colors: {
	        	Acoustique: '#ff9c00'
	        }
	    },
	    legend: {
	    	show: false
		}
	});

	<!-- Chart Luminosite -->
	var chart_lumi = c3.generate({
		bindto: '#luminosite',
    	padding: {
	        top: 0,
	        right: 0,
	        bottom: 0,
	        left: 20,
    	},
    	data: {
	        columns: [
	            ['Temperature', 18, 19, 22, 18, 19, 17]
	        ],
	        type: 'area-spline',
	        colors: {
	        	Temperature: '#ff9c00'
	        }
	    },
	    legend: {
        	show: false
    	}
	});

	<!-- Chart batterie -->
	var chart_batterie = c3.generate({
		bindto:	'#batterie',
	    data: {
	        columns: [
	            ['data', 91.4]
	        ],
	        type: 'gauge',
	        onclick: function (d, i) { console.log("onclick", d, i); },
	        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
	        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
	    },
	    gauge: {
	//        label: {
	//            format: function(value, ratio) {
	//                return value;
	//            },
	//            show: false // to turn off the min/max labels.
	//        },
	//    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
	//    max: 100, // 100 is default
	//    units: ' %',
	//    width: 39 // for adjusting arc thickness
	    },
	    color: {
	        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
	        threshold: {
	//            unit: 'value', // percentage is default
	//            max: 200, // 100 is default
	            values: [30, 60, 90, 100]
	        }
	    },
	    size: {
	        height: "100%"
	    }
	});

	setTimeout(function () {
	    chart_batterie.load({
	        columns: [['data', 10]]
	    });
	}, 1000);

	setTimeout(function () {
	    chart_batterie.load({
	        columns: [['data', 50]]
	    });
	}, 2000);

	setTimeout(function () {
	    chart_batterie.load({
	        columns: [['data', 70]]
	    });
	}, 3000);

	setTimeout(function () {
	    chart_batterie.load({
	        columns: [['data', 0]]
	    });
	}, 4000);

	setTimeout(function () {
	    chart_batterie.load({
	        columns: [['data', 100]]
	    });
	}, 5000);


}

function drawfloormap(){
	var xscale = d3.scale.linear()
               .domain([0,50.0])
               .range([0,720]),
    yscale = d3.scale.linear()
               .domain([0,33.79])
               .range([0,487]),
    map = d3.floorplan().xScale(xscale).yScale(yscale),
    imagelayer = d3.floorplan.imagelayer(),
    heatmap = d3.floorplan.heatmap(),
    vectorfield = d3.floorplan.vectorfield(),
    pathplot = d3.floorplan.pathplot(),
    //overlays = d3.floorplan.overlays().editMode(true),
    mapdata = {};

	mapdata[imagelayer.id()] = [{
	    url: 'Sample_Floorplan.jpg',
	    x: 0,
	    y: 0,
	    height: 33.79,
	    width: 50.0
	}];

	map.addLayer(imagelayer)
	   .addLayer(heatmap)
	   .addLayer(vectorfield)
	   .addLayer(pathplot);
	   //.addLayer(overlays);

	d3.json("demo-data.json", function(data) {
		mapdata[heatmap.id()] = data.heatmap;
		//mapdata[overlays.id()] = data.overlays;
		mapdata[vectorfield.id()] = data.vectorfield;
		mapdata[pathplot.id()] = data.pathplot;
		
		d3.select("#appartement").append("svg")
			.attr("height", 487).attr("width","720")
			.datum(mapdata).call(map);
	});

}
// End of Function draw
 
function error() {
    console.log("error")
}


/* */
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