var startLat = "53.5338"

var startLng = "-7.6904"



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
7); // center map at starting position, zoom level 3

var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

//  add Fullscreen to an existing map:
map.addControl(new L.Control.Fullscreen());

const baseLayers = {
	'<i class="fa fa-map"></i>&nbsp;OpenStreetMap': osm,
	'<i class="fa fa-map"></i>&nbsp;Open Topo Map': openTopoMap,
	'<i class="fa fa-map"></i>&nbsp;Historic OSM': osmGSGS3906,
	'<i class="fa fa-globe"></i>&nbsp;Esri WorldImagery': Esri_WorldImagery,
	'<i class="fa fa-globe"></i>&nbsp;Esri WorldImagery 2016': Esri_WorldImagery2,
	'<i class="fa fa-globe"></i>&nbsp;Esri WorldImagery 2014': Esri_WorldImagery3,
	'<i class="fa fa-globe"></i>&nbsp;Esri WorldImagery Clarity': Esri_WorldImagery_Clarity,
	'<i class="fa fa-globe"></i>&nbsp;Google Satelite': googleSat,
	'<i class="fa fa-globe"></i>&nbsp;Bing Satelite': bingLayer,
	
};

const overlays = {
	'<i class="fa fa-dot-circle-o"></i>&nbsp;Monuments ROI': NationalMonuments,
	'<i class="fa fa-dot-circle-o"></i>&nbsp;Monuments NI': NationalMonumentsNI,
	'<i class="fa fa-eye"></i>&nbsp;Lidar GSI 1': LidarGSI,
	'<i class="fa fa-eye"></i>&nbsp;Lidar OPW': LidarOPW,
	'<i class="fa fa-eye"></i>&nbsp;Lidar TII Roads': LidarTIIRoads,
	'<i class="fa fa-eye"></i>&nbsp;Lidar GSI 2': LidarGSI2,
	'<i class="fa fa-eye"></i>&nbsp;Lidar Dublin': LidarDublin,
	'<i class="fa fa-eye"></i>&nbsp;Lidar Cork': LidarCork,
	'<i class="fa fa-eye"></i>&nbsp;Lidar Coastal': LidarCoastal,
	'<i class="fa fa-eye"></i>&nbsp;Uisneach': LidarUisneach,
	
};

const layerControl = L.control.layers(baseLayers, overlays).addTo(map);

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
		  
