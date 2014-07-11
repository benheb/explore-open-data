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
    "spatialReference":{wkid: 102100}}, "attributes": {
        "title": f.attributes.title, 
        "datasets": f.attributes.datasets_count,
        "url": f.attributes.url,
        "groups": f.attributes.groups_count
      }, 
      "symbol":{"color":[237,50,133,128],
    "size":Math.min( Math.round( f.attributes.datasets_count / 100 * 40 ), 50), "angle":0,"xoffset":0,"yoffset":0,"type":"esriSMS",
    "style":"esriSMSCircle","outline":{"color":[171,23,89,200],"width":1,
    "type":"esriSLS","style":"esriSLSSolid"}}};
    
    var gra = new Graphic(point);
    gl.add(gra);
  }

  gl.on('mouse-over', function(e) {
    //featureSelected( e.graphic, 'mouse-over' );
    showHoverWindow(e);
  });

  gl.on('click', function(e) {
    onGraphicClick(e);
  });

  gl.on('mouse-out', function(e) {
    //removeSelectedFeature( 'mouse-over' );
  });

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

  function showHoverWindow(e) {
    var datasets = e.graphic.attributes.datasets;
    var title = e.graphic.attributes.title;
    var groups = e.graphic.attributes.groups;
    $('#title').html(title);
    $('#groups').html('Open Data Groups: ' + groups);
    $('#count').html("Datasets: " + datasets);
  }

  function onGraphicClick(e) {
    if ( e.graphic.attributes.url !== "" && e.graphic.attributes.url !== null ) {
      window.open(e.graphic.attributes.url);
    }
  }

  function featureSelected(graphicJson) {
    var graphic = {};
    graphic.geometry = graphicJson.geometry;
    graphic.symbol = {};
    graphic.attributes = { id: "selectedFeature" }


    graphic.symbol = {
      "color":[255,255,255,1],"size":graphicJson.symbol.size,"angle":0,"xoffset":0,"yoffset":0,"type":"esriSMS","style":"esriSMSCircle",
      "outline":{"color":[255,255,255,255],"width":2,
      "type":"esriSLS","style":"esriSLSSolid"}
    };


    var g = new esri.Graphic( graphic );
    
    //add to map
    map.graphics.add( g );
  }

  function removeSelectedFeature() {
    $.each(map.graphics.graphics, function(index,gra){
    if (gra) {
      console.log('ra!', gra);
      if(gra.attributes && gra.attributes.id === "selectedFeature"){
        map.graphics.remove( gra );
      }
    }
  });
  }
   
});
