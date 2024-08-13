var markericon = L.icon({
    iconUrl: 'assets/img/dot-circle-o-blue.svg',
    iconSize: [15, 15]
    });




var drawControl = new L.Control.Draw({
    draw : {
        position : 'topleft',
        polygon : true,
		polyline : true,
        rectangle : true,
        circle : true,
        
        marker: {
            icon: markericon,
			draggable: true,
        }
    },
    edit : false
});


map.addControl(drawControl); 



var drawnItems = L.geoJson().addTo(map);


map.on('draw:created', function (event) {
    var layer = event.layer,
    	feature = layer.feature = layer.feature || {};
    
    feature.type = feature.type || "Feature";
    var props = feature.properties = feature.properties || {};
    //layer.feature = {properties: {}}; // No need to convert to GeoJSON.
    //var props = layer.feature.properties;
    props.name = null;
    props.image = null;
    drawnItems.addLayer(layer);
    addPopup(layer);
});

function addPopup(layer) {
	var content = document.createElement("textarea");
    content.addEventListener("keyup", function () {
    	layer.feature.properties.name = content.value;
    });
    layer.on("popupopen", function () {
    	content.value = layer.feature.properties.name;
      content.focus();
    });
    layer.bindPopup(content).openPopup();
}

// on click, clear all layers
        document.getElementById('delete').onclick = function(e) {
            drawnItems.clearLayers();
        }


document.getElementById("export").onclick = function(e) {
            // Extract GeoJson from featureGroup
            var data = drawnItems.toGeoJSON();


// Stringify the GeoJson
            var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));			
			
// Create export
            document.getElementById('export').setAttribute('href', 'data:' + convertedData);
            document.getElementById('export').setAttribute('download','data.geojson');
       }

			