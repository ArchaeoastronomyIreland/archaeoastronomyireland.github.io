var startLat = "53.5338"

var startLng = "-7.6904"

var NationalMonuments = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      minZoom:14,
	  style: function(feature) {
         return {
            fillColor: 'white'
         };
      }
   })

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

var PassageTombs = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Megalithic tomb - passage tomb'",
      style: function(feature) {
         return {
            fillColor: 'red'
         };
      }
   })
   
var MegalithicTombsNI = L.esri
   .featureLayer({
      url: "https://services3.arcgis.com/sae2uhr3iZOENSDH/arcgis/rest/services/ni_sites_monuments/FeatureServer/0",
      minZoom:10,
	  where: "General_Ty = 'MEGALITHIC TOMB'",
      style: function(feature) {
         return {
            fillColor: 'green'
         };
      }
   })
   
var Cairns = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Cairn - unclassified'",
      minZoom:10,
	  style: function(feature) {
         return {
            fillColor: 'green'
         };
      }
   })
   
var Wedges = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Megalithic tomb - wedge tomb'",
      style: function(feature) {
         return {
            fillColor: 'pink'
         };
      }
   })

var Courttombs = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Megalithic tomb - court tomb'",
      style: function(feature) {
         return {
            fillColor: 'yellow'
         };
      }
   })

var Portaltombs = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Megalithic tomb - portal tomb'",
      style: function(feature) {
         return {
            fillColor: 'purple'
         };
      }
   })

var Henges = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Henge'",
      style: function(feature) {
         return {
            fillColor: 'orange'
         };
      }
   })

var Cursus = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Cursus'",
      style: function(feature) {
         return {
            fillColor: 'grey'
         };
      }
   })

var Rockart = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Rock art'",
      style: function(feature) {
         return {
            fillColor: '#8A477E'
         };
      }
   })

var EmbankedStoneCircle = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Stone circle - embanked'",
      style: function(feature) {
         return {
            fillColor: '#C2FA15'
         };
      }
   })

var EmbankedEnclosure = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Embanked enclosure'",
      style: function(feature) {
         return {
            fillColor: '#97D138'
         };
      }
   })

var StoneCircle = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Stone circle'",
      style: function(feature) {
         return {
            fillColor: 'blue'
         };
      }
   })

var StoneCircleFiveStone = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Stone circle - five-stone'",
      style: function(feature) {
         return {
            fillColor: '#D795F4'
         };
      }
   })

var CeremonialEnclosure = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Ceremonial enclosure'",
      style: function(feature) {
         return {
            fillColor: '#F8FA7E'
         };
      }
   })

var MoundBarrow = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Barrow - mound barrow'",
      style: function(feature) {
         return {
            fillColor: '#AF7EFA'
         };
      }
   })

var MegTombUnc = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Megalithic tomb - unclassified'",
      style: function(feature) {
         return {
            fillColor: '#D4FC67'
         };
      }
   })

var StandingStone = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Standing stone'",
	  minZoom:10,
      style: function(feature) {
         return {
            fillColor: '#49C9FC'
         };
      }
   })
   
var StandingStonePair = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Standing stone - pair'",
	  
      style: function(feature) {
         return {
            fillColor: '#F22E87'
         };
      }
   })
   
  var StoneRow = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Stone row'",
	  
      style: function(feature) {
         return {
            fillColor: '#C70039'
         };
      }
   })
   
var LinkardstownBurial = L.esri
   .featureLayer({
      url: "https://services-eu1.arcgis.com/HyjXgkV6KGMSF3jt/ArcGIS/rest/services/SMROpenData/FeatureServer/3",
      where: "MONUMENT_CLASS = 'Linkardstown burial'",
	  
      style: function(feature) {
         return {
            fillColor: '#F2782E'
         };
      }
   })

var cartoLight = L.tileLayer(
   "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
      maxZoom: 28,
      useCache: true,
      crossOrigin: true,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'

   });

var Esri_WorldImagery = L.tileLayer(
   'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 28,
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



/* Tangram terrain */
var terrain = new L.featureGroup();
var Tangramlayer = Tangram.leafletLayer({
   scene: 'data:application/octet-stream;base64,c291cmNlczoKICAgIG5leHR6ZW46CiAgICAgICAgdHlwZTogTVZUCiAgICAgICAgdXJsOiBodHRwczovL3RpbGUubmV4dHplbi5vcmcvdGlsZXplbi92ZWN0b3IvdjEvMjU2L2FsbC97en0ve3h9L3t5fS5tdnQKICAgICAgICB1cmxfcGFyYW1zOgogICAgICAgICAgICBhcGlfa2V5OiB5VW1pTllFMlI1MjlRd2Y4QWhmTGNBCiAgICAgICAgbWF4X3pvb206IDgKICAgICAgICByYXN0ZXJzOiBbbm9ybWFsc10KICAgIG5vcm1hbHM6CiAgICAgICAgdHlwZTogUmFzdGVyCiAgICAgICAgdXJsOiBodHRwczovL3RpbGUubmV4dHplbi5vcmcvdGlsZXplbi90ZXJyYWluL3YxLzI1Ni9ub3JtYWwve3p9L3t4fS97eX0ucG5nCiAgICAgICAgdXJsX3BhcmFtczoKICAgICAgICAgICAgYXBpX2tleTogeVVtaU5ZRTJSNTI5UXdmOEFoZkxjQQogICAgICAgIG1heF96b29tOiAxNQoKc3R5bGVzOgogICAgdGVycmFpbi1lbnZtYXA6CiAgICAgICAgYmFzZTogcmFzdGVyCiAgICAgICAgcmFzdGVyOiBub3JtYWwKICAgICAgICBsaWdodGluZzogZmFsc2UKICAgICAgICBzaGFkZXJzOgogICAgICAgICAgICB1bmlmb3JtczoKICAgICAgICAgICAgICAgIHVfc2NhbGU6IC4xNQogICAgICAgICAgICAgICAgdV9lbnZtYXA6IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS90YW5ncmFtcy90ZXJyYWluLWRlbW9zL21hc3Rlci9pbWcvaW1ob2Y1LmpwZwogICAgICAgICAgICBibG9ja3M6CiAgICAgICAgICAgICAgICBnbG9iYWw6IHwKICAgICAgICAgICAgICAgICAgICAvLyBTaW1wbGlmaWVkIHZpZXctaW5kZXBlbmRlbnQgZW52aXJvbm1lbnQgbWFwCiAgICAgICAgICAgICAgICAgICAgdmVjNCBhcHBseUVudm1hcCAoaW4gc2FtcGxlcjJEIF90ZXgsIGluIHZlYzMgX25vcm1hbCkgewogICAgICAgICAgICAgICAgICAgICAgICB2ZWMyIHV2ID0gMC41ICogX25vcm1hbC54eSArIDAuNTsKICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRleHR1cmUyRChfdGV4LCB1dik7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgY29sb3I6IHwKICAgICAgICAgICAgICAgICAgICBub3JtYWwueiAqPSB1X3NjYWxlOwogICAgICAgICAgICAgICAgICAgIG5vcm1hbCA9IG5vcm1hbGl6ZShub3JtYWwpOwogICAgICAgICAgICAgICAgICAgIGNvbG9yID0gYXBwbHlFbnZtYXAodV9lbnZtYXAsIG5vcm1hbCk7CiAgICBkb3RzOgogICAgICAgIGJhc2U6IGxpbmVzCiAgICAgICAgZGFzaDogWzEsIDJdCiAgICBmYWRlbGluZXM6CiAgICAgICAgYmFzZTogbGluZXMKICAgICAgICBibGVuZDogbXVsdGlwbHkKICAgIGZhZGV0ZXh0OgogICAgICAgIGJhc2U6IHRleHQKICAgICAgICBibGVuZDogb3ZlcmxheQogICAgZmFkZXBvbHlzOgogICAgICAgIGJhc2U6IHJhc3RlcgogICAgICAgIG1peDogdGVycmFpbi1lbnZtYXAKICAgICAgICBzaGFkZXJzOgogICAgICAgICAgICBibG9ja3M6CiAgICAgICAgICAgICAgICBjb2xvcjogfAogICAgICAgICAgICAgICAgICAgIGNvbG9yICo9IHZlYzQoMS4yKTsKbGF5ZXJzOgogICAgdGVycmFpbjoKICAgICAgICBkYXRhOiB7IHNvdXJjZTogbm9ybWFscywgbGF5ZXI6IF9kZWZhdWx0IH0KICAgICAgICBkcmF3OgogICAgICAgICAgICB0ZXJyYWluLWVudm1hcDoKICAgICAgICAgICAgICAgIG9yZGVyOiAwCgogICAgcGxhY2VzOgogICAgICAgIGRhdGE6IHsgc291cmNlOiBuZXh0emVuIH0KICAgICAgICBmaWx0ZXI6IAogICAgICAgICAgICBraW5kOiBbY2l0eV0KICAgICAgICBkcmF3OgogICAgICAgICAgICB0ZXh0OgogICAgICAgICAgICAgICAgZm9udDoKICAgICAgICAgICAgICAgICAgICBmaWxsOiB3aGl0ZQogICAgICAgICAgICAgICAgICAgIHNpemU6IDEwcHgKICAgICAgICAgICAgICAgICAgICBzdHJva2U6IHsgY29sb3I6ICcjNDQ0Jywgd2lkdGg6IDRweH0KICAgIGJvdW5kYXJpZXM6CiAgICAgICAgZGF0YTogeyBzb3VyY2U6IG5leHR6ZW4gfQogICAgICAgIGRyYXc6CiAgICAgICAgICAgIGRvdHM6CiAgICAgICAgICAgICAgICBjb2xvcjogWy43NSwgLjc1LCAuNzVdCiAgICAgICAgICAgICAgICB3aWR0aDogMXB4CiAgICB3YXRlcjoKICAgICAgICBkYXRhOiB7IHNvdXJjZTogbmV4dHplbiB9CiAgICAgICAgbGluZXM6CiAgICAgICAgICAgIGZpbHRlcjoge2JvdW5kYXJ5OiB0cnVlfQogICAgICAgICAgICBkcmF3OgogICAgICAgICAgICAgICAgbGluZXM6CiAgICAgICAgICAgICAgICAgICAgb3JkZXI6IDUKICAgICAgICAgICAgICAgICAgICBjb2xvcjogbGlnaHRibHVlCiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IC4zcHgKICAgIHdhdGVyLXRlcnJhaW46CiAgICAgICAgZGF0YTogeyBzb3VyY2U6IG5leHR6ZW4sIGxheWVyOiB3YXRlciB9CiAgICAgICAgZHJhdzoKICAgICAgICAgICAgZmFkZXBvbHlzOgogICAgICAgICAgICAgICAgb3JkZXI6IDQKCiAgICByb2FkczoKICAgICAgICBkYXRhOiB7IHNvdXJjZTogbmV4dHplbiB9CiAgICAgICAgZHJhdzoKICAgICAgICAgICAgZmFkZWxpbmVzOgogICAgICAgICAgICAgICAgb3JkZXI6IDMKICAgICAgICAgICAgICAgIGNvbG9yOiBbWzEwLCBbLjksIC45LCAuOV1dLCBbMTgsIHdoaXRlXV0KICAgICAgICAgICAgICAgIHdpZHRoOiBbWzEzLCAxLjVweF0sIFsxNSwgNV1dCiAgICAgICAgbGFiZWxzOgogICAgICAgICAgICBmaWx0ZXI6IHskem9vbToge21pbjogMTB9fQogICAgICAgICAgICBkcmF3OgogICAgICAgICAgICAgICAgZmFkZXRleHQ6CiAgICAgICAgICAgICAgICAgICAgYnVmZmVyOiAxMHB4CiAgICAgICAgICAgICAgICAgICAgZm9udDoKICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMTBweAogICAgICAgICAgICAgICAgICAgICAgICBmYW1pbHk6IEx1Y2lkYSBHcmFuZGUKICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogZnVuY3Rpb24oKSB7cmV0dXJuIFsxLCAxLCAxLCAkem9vbS8xNS5dO30KICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOgogICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGZ1bmN0aW9uKCkge3JldHVybiBbMCwgMCwgMCwgJHpvb20vMTUuXTt9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMXB4CiAgICBwbGFjZXM6CiAgICAgICAgZGF0YTogeyBzb3VyY2U6IG5leHR6ZW4gfQogICAgICAgIGZpbHRlcjogeyBub3Q6IHsga2luZDogW25laWdoYm91cmhvb2RdIH0gfQogICAgICAgIGNvdW50cmllczoKICAgICAgICAgICAgZmlsdGVyOiB7IGtpbmQ6IGNvdW50cnkgfQogICAgICAgICAgICBkcmF3OgogICAgICAgICAgICAgICAgdGV4dDoKICAgICAgICAgICAgICAgICAgICBmb250OgogICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHVwcGVyY2FzZQogICAgICAgICAgICAgICAgICAgICAgICBzaXplOiAxMHB4CiAgICAgICAgICAgICAgICAgICAgICAgIGZhbWlseTogTHVjaWRhIEdyYW5kZQogICAgICAgICAgICAgICAgICAgICAgICBmaWxsOiB3aGl0ZQogICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogYmxhY2sKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAycHgKICAgICAgICBjaXRpZXM6CiAgICAgICAgICAgIGZpbHRlcjogeyBub3Q6IHsga2luZDogW2NvdW50cnksIHN0YXRlXSB9IH0KICAgICAgICAgICAgYWxzbzoKICAgICAgICAgICAgICAgIGZpbHRlcjoKICAgICAgICAgICAgICAgICAgICBhbnk6CiAgICAgICAgICAgICAgICAgICAgICAgIC0gJHpvb206IHsgbWluOiA2LCBtYXg6IDggfQogICAgICAgICAgICAgICAgICAgICAgICAtIHsgbGFiZWxyYW5rOiB7bWluOiA1fSwgJHpvb206IHsgbWF4OiA2IH19CiAgICAgICAgICAgICAgICAgICAgICAgIC0geyBwb3B1bGF0aW9uOiB7IG1pbjogMTAwMDAwIH0gLCAkem9vbToge21pbjogOCB9IH0KICAgICAgICAgICAgICAgICAgICAgICAgLSB7IHBvcHVsYXRpb246IHsgbWluOiA1MDAwMCB9ICwgJHpvb206IHttaW46IDEyIH0gfQogICAgICAgICAgICAgICAgZHJhdzoKICAgICAgICAgICAgICAgICAgICB0ZXh0OgogICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbDogZmFsc2UKICAgICAgICAgICAgICAgICAgICAgICAgZm9udDoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDEwcHgKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbWlseTogTHVjaWRhIEdyYW5kZQogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogd2hpdGUKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZToKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogYmxhY2sKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMnB4CiAgICAgICAgc3RhdGVzOgogICAgICAgICAgICBmaWx0ZXI6CiAgICAgICAgICAgICAgICAtIGtpbmQ6IHN0YXRlCiAgICAgICAgICAgICAgICAgICR6b29tOiB7IG1pbjogNiB9CiAgICAgICAgICAgIGRyYXc6CiAgICAgICAgICAgICAgICB0ZXh0OgogICAgICAgICAgICAgICAgICAgIHByaW9yaXR5OiAzCiAgICAgICAgICAgICAgICAgICAgZm9udDoKICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB1cHBlcmNhc2UKICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMTBweAogICAgICAgICAgICAgICAgICAgICAgICBmYW1pbHk6IEx1Y2lkYSBHcmFuZGUKICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogd2hpdGUKICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOgogICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGJsYWNrCiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMnB4CiAgICBidWlsZGluZ3M6CiAgICAgICAgZGF0YToge3NvdXJjZTogbmV4dHplbiB9CiAgICAgICAgZHJhdzoKICAgICAgICAgICAgZmFkZWxpbmVzOgogICAgICAgICAgICAgICAgb3JkZXI6IDEwCiAgICAgICAgICAgICAgICBjb2xvcjogWy45NSwgLjk1LCAuOTVdCiAgICAgICAgICAgICAgICB3aWR0aDogMnB4'
});

Tangramlayer.addTo(terrain);

$("#terrain").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(terrain)) {
        $(this).removeClass('selected');
        map.removeLayer(terrain);
    } else {
        map.addLayer(terrain);        
        $(this).addClass('selected');
   }
});

var topoUrl = L.tileLayer(
   'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {});

var BING_KEY =
   'AmPQVvaKSid_g48EnFJjbYUOyWPlkQh1QGJlsFFZnw1EnJioQ5kvSiv2w7SUaJ9B'

var bingLayer = L.tileLayer.bing(BING_KEY)

var baseLayers = {

   "OSM Street": cartoLight,
   "ESRI Clarity": Esri_WorldImagery_Clarity,
   "OSM Topographic": topoUrl,
   "Hillshade": terrain,

};

// Create the map

var map = L.map('map', { // div id holding map
   layers: [cartoLight], // default map
   worldCopyJump: true, // move markers if scrolling horizontally across new map
   minZoom: 1, // minimum zoom level, skip level 0
   zoomControl: false, // don't show zoom buttons, we're using zoomslider instead
   
   

}).setView([startLat, startLng],
7); // center map at starting position, zoom level 3


var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

var overlayMaps = {

   "<img src='assets/img/portaltomb.svg' height='10'>&nbsp;Portal Tombs": Portaltombs,
   "<img src='assets/img/passagetomb.svg' height='10'>&nbsp;Passage Tombs": PassageTombs,
   "<img src='assets/img/wedgetomb.svg' height='10'>&nbsp;Wedge Tombs": Wedges,
   "<img src='assets/img/courttomb.svg' height='10'>&nbsp;Court Tombs": Courttombs,
   "<img src='assets/img/megtombunc.svg' height='10'>&nbsp;Megalithic Tomb Unclassified": MegTombUnc,
   "<img src='assets/img/henge.svg' height='10'>&nbsp;Henges": Henges,
   "<img src='assets/img/cursus.svg' height='10'>&nbsp;Cursus": Cursus,
   "<img src='assets/img/rockart.svg' height='10'>&nbsp;Rockart": Rockart,
   "<img src='assets/img/embankedstonecircle.svg' height='10'>&nbsp;Embanked Stone Circle": EmbankedStoneCircle,
   "<img src='assets/img/embankedenclosure.svg' height='10'>&nbsp;Embanked Enclosure": EmbankedEnclosure,
   "<img src='assets/img/ceremonialenclosure.svg' height='10'>&nbsp;Ceremonial Enclosure": CeremonialEnclosure,
   "<img src='assets/img/moundbarrow.svg' height='10'>&nbsp;Mound Barrows": MoundBarrow,
   "<img src='assets/img/standingstone.svg' height='10'>&nbsp;Standing Stone": StandingStone,
   "<img src='assets/img/standingstonepair.svg' height='10'>&nbsp;Standing Stone Pair": StandingStonePair,
   "<img src='assets/img/stonecircle.svg' height='10'>&nbsp;Stone Circle": StoneCircle,
   "<img src='assets/img/stonecircle5stone.svg' height='10'>&nbsp;Stone Circle Five Stone": StoneCircleFiveStone,
   "<img src='assets/img/stonerow.svg' height='10'>&nbsp;Stone Row": StoneRow,
   "<img src='assets/img/linkardstownburial.svg' height='10'>&nbsp;Linkardstown burial": LinkardstownBurial,
   "<img src='assets/img/cairn.svg' height='10'>&nbsp;Cairns - Unclassified": Cairns,
   "<img src='assets/img/passagetomb.svg' height='10'>&nbsp;Megalithic Tombs NI": MegalithicTombsNI,
   "<img src='assets/img/all.svg' height='10'>&nbsp;All NMI": NationalMonuments ROI,
   "<img src='assets/img/all.svg' height='10'>&nbsp;All NI NM": NationalMonuments NI,

};

// Add the map layer switching control
var layerswitcher = L.control.layers(baseLayers, overlayMaps).addTo(map);

/*----------------------------------------------------------------*/
// Show National Monuments Layer Details

NationalMonuments.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

PassageTombs.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

MegalithicTombsNI.bindPopup(function(layer) {
   return L.Util.template(

'<p><a href="https://apps.communities-ni.gov.uk/NISMR-public/Details.aspx?MonID={MONID}">Link to NISMR entry</a></p><p><strong>Edited Type:</strong> {Edited_Typ}</p><p><strong>SMR:</strong> {SMRNo}</p><p><strong>Name:</strong> {Townland_s}</p><p><strong>Grid Reference:</strong> {Grid_Refer}</p><p><strong>General Type:</strong> {General_Ty}</p><p><strong>General Period:</strong> {General_Pe}</p>',
      layer.feature.properties
   );
});

NationalMonumentsNI.bindPopup(function(layer) {
   return L.Util.template(

'<p><a href="https://apps.communities-ni.gov.uk/NISMR-public/Details.aspx?MonID={MONID}">Link to NISMR entry</a></p><p><strong>Edited Type:</strong> {Edited_Typ}</p><p><strong>SMR:</strong> {SMRNo}</p><p><strong>Name:</strong> {Townland_s}</p><p><strong>Grid Reference:</strong> {Grid_Refer}</p><p><strong>General Type:</strong> {General_Ty}</p><p><strong>General Period:</strong> {General_Pe}</p>',
      layer.feature.properties
   );
});

Cairns.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

Wedges.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

Courttombs.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

Portaltombs.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

Henges.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

Cursus.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

Rockart.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

EmbankedStoneCircle.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

EmbankedEnclosure.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

StoneCircle.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

StoneCircleFiveStone.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

CeremonialEnclosure.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

MoundBarrow.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

MegTombUnc.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

StandingStone.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

StandingStonePair.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

StoneRow.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

LinkardstownBurial.bindPopup(function(layer) {
   return L.Util.template(

      "<p><strong>Monument Type:</strong> {MONUMENT_CLASS}</p><p><strong>SMR:</strong> {SMRS}</p><p><strong>Name:</strong> {TOWNLAND}</p><p><strong>LAT/LON:</strong> {LATITUDE}, {LONGITUDE}</p><p><small>{WEB_NOTES}</small></p>",
      layer.feature.properties
   );
});

//  add Fullscreen to an existing map:
map.addControl(new L.Control.Fullscreen());