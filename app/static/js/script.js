$(document).ready( function() {

	var mbAttr = '';
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWUyZGV2IiwiYSI6ImNqaWdsMXJvdTE4azIzcXFscTB1Nmcwcm4ifQ.hECfwyQtM7RtkBtydKpc5g';

	//var layerGroups = {};
	var dataParameters = []; 
	var dp = {};
	var layerControl = false;

	// dark with labels
    // https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f 

    // Note: light_nolabels does not work on https
    var basemaps = {
    	'grayscale' : L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: '<a href="https://mapbox.com">Mapbox</a> ' + mbAttr}),
    	'satellite' : L.tileLayer(mbUrl, {maxZoom: 25, id: 'mapbox.satellite', attribution: '<a href="https://mapbox.com">Mapbox</a> ' + mbAttr}),
    	'streets' : L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: '<a href="https://mapbox.com">Mapbox</a> ' + mbAttr}),
        'cycling' : L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=5d7d3f44996c43beac7c0a0072b1efd3', {
          attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }),
        'landscape' : L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=5d7d3f44996c43beac7c0a0072b1efd3', {
          attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }),
        'outdoors' : L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=5d7d3f44996c43beac7c0a0072b1efd3', {
          attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }),
        'transport' : L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=5d7d3f44996c43beac7c0a0072b1efd3', {
          attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }),

        'positron_light_nolabels' : L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
          attributionX: 'positron_lite_rainbow'
        }),
        'litegreen' : L.tileLayer('//{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
            attribution: 'Tiles <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a>'
        }),
        'esri' : L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP'
        }),
        'dark' : L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
            attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
        }),
        'osm' : L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19, attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        }),
        'firemap' : L.tileLayer('http://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=5d7d3f44996c43beac7c0a0072b1efd3', {
          attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
    }

    var cityNamesLight = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png');
    var cityNamesDark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png');


	var markers = [], // an array containing all the markers added to the map
		markersCount = 0; // the number of the added markers

	var initMap = function () {
		// create a map in the "map" div, set the view to a given place and zoom
		var center = [37.7394, -25.6687]; var zoom = 3; // Americas to India
		//var center = [33.77734, -84.3890]; var zoom = 19; // Centergy Tech Square
		//var center = [33.7726, -84.3655]; var zoom = 19; // Ponce City Market

		// Setting maxZoom: 19 here does not override layer maxZoom defaults.
		// 	zoomControl: false,
	    map = new L.Map( 'map', { 
	    	scrollWheelZoom: false
	    } ).setView( center, zoom );
		//disabled zoomControl when initializing map (which is topleft by default)
		//the add zoom control topright
		L.control.zoom({
		     position:'bottomright'
		}).addTo(map);

		var baseLayers = {
			"Satellite": basemaps['satellite'],
			"Open Street Map": basemaps['osm'],
			"Public Transport": basemaps['transport'],
			"Cycling Routes": basemaps['cycling'],
			"Gray and Green": basemaps['litegreen'],
			"Beige and Green": basemaps['streets'],
		    "Grayscale": basemaps['grayscale'],
		    "Landscape Topo": basemaps['landscape'],
		    "Outdoor Topo": basemaps['outdoors'],
		    "Esri": basemaps['esri'],
		    "Dark": basemaps['dark'],
		    "Firemap": basemaps['firemap'],
		  };

		  var overlays = {};
		  //dataParameters.forEach(function(ele) {
		  //  overlays[ele.name] = ele.group; // Add to layer menu
		  //})
		  if(layerControl === false) {
		    layerControl = L.control.layers(baseLayers, overlays).addTo(map);
		    baseLayers["Satellite"].addTo(map); // Set the initial baselayer.
		  }

		  //$('.leaflet-container').css('cursor','crosshair');



	    // add a tile layer
	    /*
	    L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    	maxZoom: 25,
	        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	    }).addTo(map);
		*/

	    /* Dark, but we'll use layers instead
		L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
            attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
        }).addTo(map);
		*/

		// Neither worked:
	    //var anything = basemaps['dark'];
		//L.tileLayer(basemaps['dark']).addTo(map);

	    /* MASK */
	    /*
	    L.TileLayer.boundaryCanvas(basemap._url, {
            boundary: statesData
        }).addTo(map);
		*/

	    /*
	    var circle = L.circle([33.77734, -84.3890], {
		    color: 'red',
		    fillColor: '#f03',
		    fillOpacity: 0.5,
		    radius: 6 
		}).addTo(map);
		*/

		// add a marker in the given location - not appearing, needs to include local marker-icon-2x.png and marker-shadow.png
		//var latlon = [33.77734, -84.3890];
		//L.marker(latlon).addTo(map);
		//L.marker([32.7775, -83.3890]).addTo(map);

		
		map.on('click', function(ev){
		  var latlng = map.mouseEventToLatLng(ev.originalEvent);
		  console.log(latlng.lat + ', ' + latlng.lng);
		});
	}

	// Dragging and dropping the markers to the map
	//var addMarkers;
	//function initDraggable() {
		var addMarkers = function () {
			// The position of the marker icon
			var posTop = $( '.draggable-marker' ).css( 'top' ),
			posLeft = $( '.draggable-marker' ).css( 'left' );

			$( '.draggable-marker' ).draggable({
				appendTo: 'body',
				containment: 'window',
				scroll: false,
				helper: 'clone',
				start: function(event, ui) { 
					//alert('test');
					// Works well for marker, but img has issue due to size change
			        $(this).draggable("option", "cursorAt", { // Centers icon on pickup, so it doesn't jump on dropoff.
			            left: Math.floor(this.clientWidth / 2),
			            top: Math.floor(this.clientHeight / 2)
			        });
			    },
				stop: function ( e, ui ) {
					// returning the icon to the menu - not needed when cloning, which is need to take outside of surrounding parent for movement to map.
					//$( '.draggable-marker' ).css( 'top', posTop );
					//$( '.draggable-marker' ).css( 'left', posLeft );

					var offsetLeft = $("#map").offset().left;
					var offsetTop = $("#map").offset().top;
					var className = 'icon__image';
					var iconUrl = 'img/marker-icon.png';
					var iconSize = [20, 40];
					var iconAnchor = [10, 40];

					if ($(this).css('background-image') != "none") {
						className = 'person__image';
						iconUrl = $(this).css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
						iconSize = [40, 40];
						iconAnchor = [20, 40]; // tip of icon.  icon width/2, icon height
					}
					var coordsX = event.clientX - offsetLeft, // Where you grab marker needs to be factored in.
						coordsY = event.clientY + 20 - offsetTop, // 20 is half of markers height
						point = L.point( coordsX, coordsY ), // createing a Point object with the given x and y coordinates
						markerCoords = map.containerPointToLatLng( point ), // getting the geographical coordinates of the point

						// Create custom icon
						myIcon = L.icon({
							iconUrl: iconUrl, // the url of the marker or dragged img
							iconSize: iconSize,
							iconAnchor: iconAnchor, // the coordinates of the "tip" of the icon.  icon width/2, icon height
							className: className
						});

						// Add class person__image

					// Creating a new marker and adding it to the map
					markers[markersCount] = L.marker( [ markerCoords.lat, markerCoords.lng ], {
						draggable: true,
						icon: myIcon
					}).addTo( map );

					//alert('dropped'); // But not triggered if point repositioned.
					//alert(markers[markersCount].options.icon.options.className);
					markersCount++;
				}
			});
			
		}
	//}
	//initDraggable(); // Also called when more people icons added to DOM.
	initMap();
	addMarkers();

	var people_shown = false;
	$('.showpeople').click(function(event) {
        if ($("#sidelist").is(':visible')) {
            $('#sidelist').hide();
        } else {
        	if (!people_shown) {
	            $('#grouplist').html($('#teamtext').val()); // Copy from textarea to sidelist
	            //initDraggable();
	            addMarkers();
	            people_shown = true;
	        }
            $('#sidelist').show();
        }
    });
	$('.hideAppMenu').click(function(event) {
		$('#appmenu').hide();
	});
	$('#topselectors divX').click(function(event) {
		$(this).css("border","1px solid #999");
		var center = [33.77734, -84.3890]; // Tech Square
	    map.flyTo(center, 19);

	   	//map.flyTo(latLon).fitBounds(bounds);
		//map.flyTo([13.87992, 45.9791], 12);

		//var imageUrl = 'img/PCM-floorplan.png',
		//imageBounds = [center, [32.77729, -83.3889]];
		//L.imageOverlay(imageUrl, imageBounds).addTo(map);

		var imageUrl = 'img/PCM-floorplan.png',
    // This is the trickiest part - you'll need accurate coordinates for the
    // corners of the image. You can find and create appropriate values at
    // http://maps.nypl.org/warper/ or
    // http://www.georeferencer.org/
    imageBounds = L.latLngBounds([
        [33.77734, -84.3890],
        [32.77729, -83.3889]]);

    //map.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'))
    //.fitBounds(imageBounds);

    var overlay = L.imageOverlay(imageUrl, imageBounds)
    .addTo(map);

	});

	var location = {
		Tech_Square: [33.77734, -84.3890],
		Ponce: [33.77279539985879, -84.36538422550765],
		Colorado: [40.525180, -105.026200],
		Virginia: [38.9544, -77.4283],
		Kansas: [37.719129880501434, -97.26137264626136],
	}
	$('#topselectors div').click(function(event) {
		$('#topselectors div').removeClass('active');
		$(this).addClass('active');
		var loctext = $(this).text().replace(' ','_');
		var center = location[loctext]; // Ponce City Market
		if (loctext == '+') {
			alert('Click the map to send a lat/lon value to the browser console.\rAdd the lat/lon value to the location object in script.js.');
			return;
		} else if (loctext == 'Ponce') {
			map.flyTo(center, 19); // Increase this to 19 after setting other baselayers to jump back to closest available tiles when changing base layers, otherwise no tiles as closest level.
		} else {
	    	map.flyTo(center, 18);
		}
	    // Works, but no rotation since only two points
		//var upperleft = [33.7726, -84.3655];
		//var lowerright = [33.7716, -84.3635];
		//var imageUrl = 'img/PCM-floorplan.png', imageBounds = [upperleft, lowerright];
		//L.imageOverlay(imageUrl, imageBounds).addTo(map);
		//L.imageOverlay(imageUrl, imageBounds).bringToFront();
		
		var topleft = L.latLng(33.7732854449586, -84.36675018130354),
		topright   = L.latLng(33.7731472115384, -84.36487048732805),
		bottomleft = L.latLng(33.77237131658895, -84.36684135048353);

		var overlay = L.imageOverlay.rotated("img/PCM-floorplan.png", topleft, topright, bottomleft, {
			opacity: 1.0,
			interactive: true
		}).addTo(map);
		

	});

	// Store
	localStorage.setItem("email", "loren@dreamstudio.com");
	// Fetch
	document.getElementById("email").value = localStorage.getItem("email");

	/*
	 * jQuery.gravatar 1.0.1 (2009-01-08)
	 *
	 * Written by Zach Leatherman
	 * http://zachleat.com
	 *
	 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/)
	 *
	 * Requires jQuery http://jquery.com (1.2.6 at time of release)
	 * Requires http://pajhome.org.uk/crypt/md5/md5.js
	 */

	(function($)
	{
	    $.gravatar = function(emailAddress, overrides)
	    {
	        var options = $.extend({
	            // Defaults are not hardcoded here in case gravatar changes them on their end.
	            // integer size: between 1 and 512, default 80 (in pixels)
	            size: '',
	            // rating: g (default), pg, r, x
	            rating: '',
	            // url to define a default image (can also be one of: identicon, monsterid, wavatar)
	            image: '',
	            // secure
	            secure: false,
	            // support css on img element
	            classes: ''
	        }, overrides);

	        var baseUrl = options.secure ? 'https://secure.gravatar.com/avatar/' : 'http://www.gravatar.com/avatar/';

	        return baseUrl +
	            hex_md5(emailAddress) +
	            '.jpg?' +
	            (options.size ? 's=' + options.size + '&' : '') +
	            (options.rating ? 'r=' + options.rating + '&' : '') +
	            (options.image ? 'd=' + encodeURIComponent(options.image) : '');

	        return $('<img src="' + baseUrl +
	            hex_md5(emailAddress) +
	            '.jpg?' +
	            (options.size ? 's=' + options.size + '&' : '') +
	            (options.rating ? 'r=' + options.rating + '&' : '') +
	            (options.image ? 'd=' + encodeURIComponent(options.image) : '') +
	            '"' +
	            (options.classes ? ' class="' + options.classes + '"' : '') +
	            ' />').bind('error', function()
	            {
	                $(this).remove();
	            });
	    };
	})(jQuery);

	
});
