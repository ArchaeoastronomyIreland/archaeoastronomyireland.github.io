var startLat = "53.8007"

var startLng = "-4.6802"



// Create the map



const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});


var LidarGSI = L.esri.imageMapLayer({
          url: "https://secure.dccae.gov.ie/arcgis/rest/services/Groundwater/LIDAR_Lidar_Mosaic_V2/ImageServer",
          attribution: "Contains Irish Public Sector Data (Geological Survey Ireland, Department of Culture, Heritage and the Gaeltacht, Discovery Programme and the Heritage Council) licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) licence."
        });
		
var LidarOPW = L.esri.dynamicMapLayer({
          url: "https://gsi.geodata.gov.ie/server/rest/services/Lidar/IE_GSI_LiDAR_DSM_HS_OPW_NASC_IE26_2m_ITM_MH_TIFF/MapServer",
          attribution: "Contains Irish Public Sector Data (Geological Survey Ireland & the Office of Public Works) licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) licence."
        });
		
var LidarTIIRoads = L.esri.dynamicMapLayer({
          url: "https://gsi.geodata.gov.ie/server/rest/services/Lidar/IE_GSI_LiDAR_HS_TII_2m_IE26_ITM_MH_TIFF/MapServer",
          attribution: "Contains Irish Public Sector Data (Geological Survey Ireland & Transport Infrastructure Ireland) licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) licence."
        });
		
var LidarGSI2 = L.esri.dynamicMapLayer({
          url: "https://gsi.geodata.gov.ie/server/rest/services/Lidar/IE_GSI_LiDAR_DTM_HS_GSI_Phase2_1m_IE26_ITM_MH_TIFF/MapServer",
          attribution: "Contains Irish Public Sector Data (Geological Survey Ireland) licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) licence"
        });
		
var LidarUisneach = L.esri.dynamicMapLayer({
          url: "https://gsi.geodata.gov.ie/server/rest/services/Lidar/IE_GSI_LiDAR_DTM_HS_WMCoCo_25cm_Westmeath_ITM_MH_TIFF/MapServer",
          attribution: "Contains Irish Public Sector Data (Geological Survey Ireland & Westmeath County Council) licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) licence."
        });
		
var LidarDublin = L.esri.dynamicMapLayer({
          url: "https://gsi.geodata.gov.ie/server/rest/services/Lidar/IE_GSI_LiDAR_DSM_HS_NYU_1m_Dublin_ITM_MH_TIFF/MapServer",
          attribution: "Geological Survey Ireland & New York University data licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) licence."
        });
		
var LidarCork = L.esri.dynamicMapLayer({
          url: "https://gsi.geodata.gov.ie/server/rest/services/Lidar/IE_GSI_LiDAR_DTM_HS_OPW_125mm_Cork_ITM_MH_TIFF/MapServer",
          attribution: "Contains Irish Public Sector Data (Geological Survey Ireland & the Office of Public Works) licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) licence"
        });
		
var LidarCoastal = L.esri.dynamicMapLayer({
          url: "https://gsi.geodata.gov.ie/server/rest/services/Lidar/IE_GSI_LiDAR_DTM_HS_OPW_2m_IE26_ITM_MH_TIFF/MapServer",
          attribution: "Contains Irish Public Sector Data (Geological Survey Ireland & the Office of Public Works) licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) licence."
        });


var IrlLidarLayerGroup = L.layerGroup([LidarOPW, LidarTIIRoads, LidarGSI2, LidarUisneach, LidarDublin, LidarCork, LidarCoastal]);


		
var LidarEng = L.tileLayer.wms('https://environment.data.gov.uk/spatialdata/lidar-composite-digital-terrain-model-dtm-1m/wms', {
			layers: 'Lidar_Composite_Hillshade_DTM_1m'
});

const LidarWales = L.tileLayer('https://geo.nls.uk/mapdata3/lidar/wales/{z}/{x}/{y}.png', {
	maxZoom: 19
	
});

const LidarScot1 = L.tileLayer('https://geo.nls.uk/mapdata3/lidar/rgb/phase1/{z}/{x}/{y}.png', {
	maxZoom: 19
	
});

const LidarScot2 = L.tileLayer('https://geo.nls.uk/mapdata3/lidar/rgb/phase2/{z}/{x}/{y}.png', {
	maxZoom: 19
	
});

const LidarScot3 = L.tileLayer('https://geo.nls.uk/mapdata3/lidar/rgb/phase3/{z}/{x}/{y}.png', {
	maxZoom: 19
	
});

const LidarScot4 = L.tileLayer('https://geo.nls.uk/mapdata3/lidar/rgb/phase4/{z}/{x}/{y}.png', {
	maxZoom: 19
	
});

const LidarScot5 = L.tileLayer('https://geo.nls.uk/mapdata3/lidar/rgb/phase5/{z}/{x}/{y}.png', {
	maxZoom: 19
	
});

const LidarScot6 = L.tileLayer('https://geo.nls.uk/mapdata3/lidar/rgb/phase6/{z}/{x}/{y}.png', {
	maxZoom: 19
	
});

var ScotLidarLayerGroup = L.layerGroup([LidarScot1, LidarScot2, LidarScot3, LidarScot4, LidarScot5, LidarScot6]);

var NationalMonuments = L.esri.featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      attribution: "Contains National Monuments Service - Archaeological Survey of Ireland Data licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) licence",
	  minZoom:14,
	  style: function(feature) {
         return {
            fillColor: '#DFFF00'
         };
      }
   });

var NationalMonumentsNI = L.esri
   .featureLayer({
      url: "https://services3.arcgis.com/sae2uhr3iZOENSDH/arcgis/rest/services/ni_sites_monuments/FeatureServer/0",
      minZoom:14,
	  style: function(feature) {
         return {
            fillColor: 'white'
         };
      }
   })
   
var NationalMonumentsEng = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/ZOdPfBS3aqqDYPUQ/arcgis/rest/services/National_Heritage_List_for_England_NHLE_v02_VIEW/FeatureServer/6",
      minZoom:14,
	  style: function(feature) {
         return {
            fillColor: 'white'
         };
      }
   })


var Esri_WorldImagery = L.tileLayer(
   'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 28,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
   });
   
var Esri_WorldImagery2 = L.tileLayer(
      
      'https://wayback-usw2.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/28163/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });
		
var Esri_WorldImagery3 = L.tileLayer(
      
      'https://wayback-usw2.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/10/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

var Esri_WorldImagery_Clarity = L.tileLayer(
   'https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 38,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
   });
   
var googleSat = L.tileLayer(
   'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 28,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
   });

var BING_KEY = 'AmPQVvaKSid_g48EnFJjbYUOyWPlkQh1QGJlsFFZnw1EnJioQ5kvSiv2w7SUaJ9B'

var bingLayer = L.tileLayer.bing(BING_KEY)

var osmGSGS3906 = L.tileLayer("https://mapwarper.net/layers/tile/101/{z}/{x}/{y}.png", {
                        visibility: false,
      				  format: 'image/png', 
      				  numZoomLevels: 19,
      				  crossOriginKeyword: null,
      });
	  
const openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var map = L.map('map', { // div id holding map
   layers: [osm], // default map
   worldCopyJump: true, // move markers if scrolling horizontally across new map
   minZoom: 1, // minimum zoom level, skip level 0
   zoomControl: false, // don't show zoom buttons, we're using zoomslider instead
   
   

}).setView([startLat, startLng],
6); // center map at starting position, zoom level 3

function zoomTo() {
        var lat = document.getElementById("lat").value;
        var lng = document.getElementById("lng").value;
        map.panTo(new L.LatLng(lat, lng));
    } 




         






var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

//  add Fullscreen to an existing map:
map.addControl(new L.Control.Fullscreen());

const baseLayers = {
	'<i class="fa fa-map"></i>&nbsp;OpenStreetMap': osm,
	'<i class="fa fa-map"></i>&nbsp;Open Topo Map': openTopoMap,
	'<i class="fa fa-globe"></i>&nbsp;Esri WorldImagery Current': Esri_WorldImagery,
	'<i class="fa fa-globe"></i>&nbsp;Esri WorldImagery 2016': Esri_WorldImagery2,
	'<i class="fa fa-globe"></i>&nbsp;Esri WorldImagery 2014': Esri_WorldImagery3,
	'<i class="fa fa-globe"></i>&nbsp;Esri WorldImagery Clarity': Esri_WorldImagery_Clarity,
	'<i class="fa fa-globe"></i>&nbsp;Google Satelite Current': googleSat,
	'<i class="fa fa-globe"></i>&nbsp;Bing Satelite Current': bingLayer,
	
};




// Overlay layers are grouped
    var groupedOverlays = {
      "England": {
        '<i class="fa fa-map-pin"></i>&nbsp;Monuments Eng': NationalMonumentsEng,
        '<i class="fa fa-eye"></i>&nbsp;Lidar England': LidarEng,
      },
      "Ireland ROI": {
        '<i class="fa fa-map"></i>&nbsp;Historic OSM': osmGSGS3906,
        '<i class="fa fa-map-pin"></i>&nbsp;Monuments ROI': NationalMonuments,
		'<i class="fa fa-eye"></i>&nbsp;IRL Lidar GSI 1': LidarGSI,
	    '<i class="fa fa-eye"></i>&nbsp;IRL Lidar OPW': LidarOPW,
	    '<i class="fa fa-eye"></i>&nbsp;Lidar TII Roads': LidarTIIRoads,
	    '<i class="fa fa-eye"></i>&nbsp;Lidar GSI 2': LidarGSI2,
	    '<i class="fa fa-eye"></i>&nbsp;Lidar Dublin': LidarDublin,
	    '<i class="fa fa-eye"></i>&nbsp;Lidar Cork': LidarCork,
	    '<i class="fa fa-eye"></i>&nbsp;Lidar Coastal': LidarCoastal,
	    '<i class="fa fa-eye"></i>&nbsp;Uisneach': LidarUisneach
      },
	  "Ireland NI": {
        '<i class="fa fa-m"></i>&nbsp;Monuments NI': NationalMonumentsNI
        
      },
	  "Scotland": {
        '<i class="fa fa-eye"></i>&nbsp;Lidar Scotland Phase 1': LidarScot1,
	    '<i class="fa fa-eye"></i>&nbsp;Lidar Scotland Phase 2': LidarScot2,
	    '<i class="fa fa-eye"></i>&nbsp;Lidar Scotland Phase 3': LidarScot3,
	    '<i class="fa fa-eye"></i>&nbsp;Lidar Scotland Phase 4': LidarScot4,
	    '<i class="fa fa-eye"></i>&nbsp;Lidar Scotland Phase 5': LidarScot5,
	    '<i class="fa fa-eye"></i>&nbsp;Lidar Scotland Phase 6': LidarScot6
      },
	  "Wales": {
        '<i class="fa fa-eye"></i>&nbsp;Lidar Wales': LidarWales
        
      },
    };

    // Use the custom grouped layer control, not "L.control.layers"
    L.control.groupedLayers(baseLayers, groupedOverlays).addTo(map);



















NationalMonuments.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

NationalMonumentsNI.bindPopup(function(layer) {
   return L.Util.template(

'<p><a href="https://apps.communities-ni.gov.uk/NISMR-public/Details.aspx?MonID={MONID}">Link to NISMR entry</a></p><p><strong>Edited Type:</strong> {Edited_Typ}</p><p><strong>SMR:</strong> {SMRNo}</p><p><strong>Name:</strong> {Townland_s}</p><p><strong>Grid Reference:</strong> {Grid_Refer}</p><p><strong>General Type:</strong> {General_Ty}</p><p><strong>General Period:</strong> {General_Pe}</p>',
      layer.feature.properties
   );
});

NationalMonumentsEng.bindPopup(function(layer) {
   return L.Util.template(

'<p><strong>List Entry:</strong> {ListEntry}</p><p><strong>Description:</strong> {Name}</p><p><a href="https://historicengland.org.uk/listing/the-list/list-entry/{ListEntry}" target="_blank">Link to NHLE entry</a></p><p><strong>Easting/Northing:</strong> {Easting}, {Northing}</p><p><strong>National Grid Reference:</strong> {NGR}</p>',
      layer.feature.properties
   );
});

var htmlLegendLidarGSI = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarGSI,
                  elements: [{
                      label: 'Lidar GSI',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarGSI)

var htmlLegendLidarOPW = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarOPW,
                  elements: [{
                      label: 'Lidar OPW',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarOPW)

var htmlLegendLidarTIIRoads = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarTIIRoads,
                  elements: [{
                      label: 'Lidar TII Roads',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarTIIRoads)
		  
var htmlLegendLidarGSI2 = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarGSI2,
                  elements: [{
                      label: 'Lidar GSI2 Roads',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarGSI2)
		  
var htmlLegendLidarDublin = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarDublin,
                  elements: [{
                      label: 'Lidar Dublin',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarDublin)
		  
var htmlLegendLidarCork = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarCork,
                  elements: [{
                      label: 'Lidar Cork',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarCork)
		  
var htmlLegendLidarUisneach = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarUisneach,
                  elements: [{
                      label: 'Lidar Uisneach',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarUisneach)
		  
var htmlLegendLidarCoastal = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarCoastal,
                  elements: [{
                      label: 'Lidar Coastal',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarCoastal)
		  
var htmlLegendLidarEngland = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarEng,
                  elements: [{
                      label: 'Lidar England',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarEngland)
		  
var htmlLegendLidarWales = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarWales,
                  elements: [{
                      label: 'Lidar Wales',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarWales)
		  
var htmlLegendLidarScot1 = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarScot1,
                  elements: [{
                      label: 'Lidar Scotland Phase1',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarScot1)
		  
var htmlLegendLidarScot2 = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarScot2,
                  elements: [{
                      label: 'Lidar Scotland Phase2',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarScot2)
		  
var htmlLegendLidarScot3 = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarScot3,
                  elements: [{
                      label: 'Lidar Scotland Phase3',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarScot3)
		  
var htmlLegendLidarScot4 = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarScot4,
                  elements: [{
                      label: 'Lidar Scotland Phase4',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarScot4)
		  
var htmlLegendLidarScot5 = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarScot5,
                  elements: [{
                      label: 'Lidar Scotland Phase5',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarScot5)
		  
var htmlLegendLidarScot6 = L.control.htmllegend({
              position: 'bottomleft',
              legends: [{
                  
                  layer: LidarScot6,
                  elements: [{
                      label: 'Lidar Scotland Phase6',
                      html: ''
                  }]
              }],
              defaultOpacity: 1.0,
              collapseSimple: true,
              detectStretched: true,
              visibleIcon: 'icon icon-eye',
              hiddenIcon: 'icon icon-eye-slash',
              
             });
      
          map.addControl(htmlLegendLidarScot6)
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
var markericon = L.icon({
    iconUrl: 'assets/img/dot-circle-o-blue.svg',
    iconSize: [15, 15]
    });




drawControl = new L.Control.Draw({
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














	   

$(document).ready(function(){
             $('[rel=tooltip]').tooltip({ trigger: "hover" });
         });
         
      function copyToClipboard(element) {
         var $temp = $("<input>");
           $("body").append($temp);
           $temp.val($(element).text()).select();
           document.execCommand("copy");
           $temp.remove();
         }
         
               
    
         $('#clickhere').click(function() {
            downloadeverything();
         });
         
         function downloadeverything() {
            function downloadInnerHtml(filename, elId, mimeType) {
               var elHtml = $('#' + elId).text();
               var link = document.createElement('a');
               mimeType = mimeType || 'text/plain';
               link.setAttribute('download', filename);
               link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
               link.click();
            }
            var fileName = 'maceoutput.geojson';
            downloadInnerHtml(fileName, 'geojson', 'text/html');
         }