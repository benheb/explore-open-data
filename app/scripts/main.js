//MAP! 
var map;
require(["esri/map", "dojo/request", "esri/geometry/Circle", "esri/symbols/SimpleFillSymbol", 
  "esri/graphic", "esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/layers/ArcGISTiledMapServiceLayer", 
  "esri/layers/FeatureLayer", "dojo/domReady!"], function(Map, request, Circle, SimpleFillSymbol, Graphic, GraphicsLayer, Point) { 

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
  
  var symbol = new SimpleFillSymbol().setColor(null).outline.setColor("blue");
  var gl = new GraphicsLayer({ id: "circles" });
  map.addLayer(gl);

  function add(f){
    console.log(f);
    var point = new Point([-117.15,32.71]);
    var circle = new Circle(point, {
      radius: 100
    });
    var graphic = new Graphic(circle, symbol);
    gl.add(graphic);
  }

  request("explore.json").then(function(data){
    // do something with handled data
    var sites = JSON.parse(data).sites, feature;

    sites.forEach(function(site,i){
      feature = {
        geometry: {
          x: site.default_extent.xmin + (site.default_extent.xmax - site.default_extent.xmin),
          y: site.default_extent.ymin + (site.default_extent.ymax - site.default_extent.ymin),
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
