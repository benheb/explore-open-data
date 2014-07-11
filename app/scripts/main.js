//MAP! 
var map;
require(["esri/map", "dojo/request", "esri/geometry/Circle", "esri/symbols/SimpleFillSymbol", 
  "esri/graphic", "esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/SpatialReference", "esri/layers/ArcGISTiledMapServiceLayer", 
  "esri/layers/FeatureLayer", "dojo/domReady!"], function(Map, request, Circle, SimpleFillSymbol, Graphic, GraphicsLayer, Point, SpatialReference) { 

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
  
  var gl = new GraphicsLayer({ id: "circles" });
  map.addLayer(gl);

  function add(f){

    var point = {"geometry":{"x":f.geometry.x,"y":f.geometry.y,
    "spatialReference":{wkid: 102100}},"symbol":{"color":[237,108,33,128],
    "size":f.attributes.datasets_count / 15,"angle":0,"xoffset":0,"yoffset":0,"type":"esriSMS",
    "style":"esriSMSCircle","outline":{"color":[255,255,255,255],"width":1,
    "type":"esriSLS","style":"esriSLSSolid"}}};
    
    var gra = new Graphic(point);
    gl.add(gra);
  }

  request("explore.json").then(function(data){
    // do something with handled data
    var sites = JSON.parse(data).sites, feature;

    sites.forEach(function(site,i){
      feature = {
        geometry: {
          x: site.default_extent.xmin + (site.default_extent.xmax - site.default_extent.xmin)/2,
          y: site.default_extent.ymin + (site.default_extent.ymax - site.default_extent.ymin)/2,
          type: 'point',
          spatialReference: {
            latestWkid: 3857,
            wkid: 102100
          }
        },
        attributes: {
          title: site.title,
          url: site.url,
          created_at: site.created_at,
          updated_at: site.updated_at,
          public: site.public,
          groups_count: site.groups_count,
          datasets_count: site.datasets_count
        }
      };

      add(feature);

    });   
  });
   
});
