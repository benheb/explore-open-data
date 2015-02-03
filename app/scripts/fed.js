//MAP! 
var map;
require(["esri/map", "dojo/request", "esri/geometry/Circle", "esri/symbols/SimpleFillSymbol", 
  "esri/graphic", "esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/SpatialReference", "esri/geometry/webMercatorUtils",
  "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/FeatureLayer", "dojo/domReady!"], function(Map, request, Circle, 
    SimpleFillSymbol, Graphic, GraphicsLayer, Point, SpatialReference, webMercatorUtils) { 

  esriConfig.defaults.map.basemaps.dotted = {
    baseMapLayers: [
      { url: "http://studio.esri.com/arcgis/rest/services/World/WorldBasemapWhite/MapServer" }
    ],
    title: "dots"
  };

  map = new Map("map", {
    center: [-39.049, 19.485],
    zoom: 3,
    basemap: "dotted"
  });

  var searchExtentLayer = new esri.layers.GraphicsLayer({id:"extentLayer"});
  map.addLayer( searchExtentLayer );

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
        "symbol":{"color":[241,196,15,128],
      "size":Math.min( Math.round( f.attributes.datasets_count / 100 * 40 ), 50), "angle":0,"xoffset":0,"yoffset":0,"type":"esriSMS",
      "style":"esriSMSCircle","outline":{"color":[230,126,34,200],"width":1,
      //"style":"esriSMSCircle","outline":{"color":[192,57,43,200],"width":1,
      "type":"esriSLS","style":"esriSLSSolid"}}};
    
    var gra = new Graphic(point);
    gl.add(gra);
  }

  map.on('zoom', function() {
    $('#intro-container').fadeOut('slow');
  });

  gl.on('mouse-over', function (e) {
    //featureSelected( e.graphic, 'mouse-over' );
    showFeature(e.graphic, true);
    showHoverWindow(e);
  });

  gl.on('mouse-out', function (e) {
    showFeature(e.graphic, false);
  });

  gl.on('click', function(e) {
    onGraphicClick(e);
  });

  gl.on('mouse-out', function(e) {
    //removeSelectedFeature( 'mouse-over' );
  });

  //request("http://opendata.arcgis.com/explore.json").then(function(data){
  request("/explore-020315.json").then(function(data){
    // do something with handled data
    var sites = JSON.parse(data).sites, feature;

    sites.forEach(function(site,i){

      var x = site.default_extent.xmin + (site.default_extent.xmax - site.default_extent.xmin)/2;
      var y = site.default_extent.ymin + (site.default_extent.ymax - site.default_extent.ymin)/2;

      var geom;
      if ( site.default_extent.spatialReference ) {
        if ( site.default_extent.spatialReference.wkid === 4326 ) {
          var xy = webMercatorUtils.lngLatToXY(x, y);
          geom = {
            x: xy[0],
            y: xy[1],
            type: 'point',
            spatialReference: {
              latestWkid: 3857,
              wkid: 102100
            }
          }
        } else {
          geom = {
            x: x,
            y: y,
            type: 'point',
            spatialReference: {
              latestWkid: 3857,
              wkid: 102100
            }
          }
        }
      } else {
        if ( site.default_extent.spatial_reference.wkid === 4326 ) {
          var xy = webMercatorUtils.lngLatToXY(x, y);
          geom = {
            x: xy[0],
            y: xy[1],
            type: 'point',
            spatialReference: {
              latestWkid: 3857,
              wkid: 102100
            }
          }
        } else {
          geom = {
            x: x,
            y: y,
            type: 'point',
            spatialReference: {
              latestWkid: 3857,
              wkid: 102100
            }
          }
        }
      }

      feature = {
        geometry: geom,
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

    var extentGeometries = [];
    var sym = esri.symbol.SimpleFillSymbol(
      esri.symbol.SimpleFillSymbol.STYLE_SOLID,
      new esri.symbol.SimpleLineSymbol(
        esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255,255,255]), 0.4),
      new dojo.Color([93,173,221,0.0])
    );
    
    
    _.each(sites, function (item){
      extent = new esri.geometry.Extent(
        item.default_extent.xmin, 
        item.default_extent.ymin, 
        item.default_extent.xmax, 
        item.default_extent.ymax, 
        new esri.SpatialReference({ wkid:102100 })
      );    

      var graphic = new esri.Graphic(extent, sym, {name: item.title, url: item.url});
          
      searchExtentLayer.add(graphic);
       
    });

  });

  // Enhance symbol when mouse is over graphic
  function showFeature(g, show) {
    var s = g.symbol;
    if (show) {
      s.color.a = .75;
      s.outline.width = 3; // 5 if you want more emphasis
      s.outline.color.a = 1;
      g.setSymbol(s);
    } else {
      s.color.a = 0.5;
      s.outline.width = 1;
      s.outline.color.a = .85;
      g.setSymbol(s);
    }
  }

  function showHoverWindow(e) {
    if (!$('#intro-container').is(':visible')) {
      var datasets = e.graphic.attributes.datasets;
      var title = e.graphic.attributes.title;
      var groups = e.graphic.attributes.groups;
      $('#title').html(title);
      $('#groups').html('Open Data Groups: ' + groups);
      $('#count').html("Datasets: " + datasets);
    }
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
      if(gra.attributes && gra.attributes.id === "selectedFeature"){
        map.graphics.remove( gra );
      }
    }
  });
  }
   
});
