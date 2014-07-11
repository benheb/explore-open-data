//MAP! 
var map;
require(["esri/map", "esri/layers/ArcGISTiledMapServiceLayer", 
  "esri/layers/FeatureLayer", "dojo/domReady!"], function(Map) { 

  esriConfig.defaults.map.basemaps.dotted = {
    baseMapLayers: [
      { url: "http://studio.esri.com/arcgis/rest/services/World/WorldBasemapBlack/MapServer" }
    ],
    title: "dots"
  };

  map = new Map("map", {
    center: [-56.049, 38.485],
    zoom: 3,
    basemap: "dotted"
  });
});