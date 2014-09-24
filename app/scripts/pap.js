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


  var pap = [
    "gisdata.evvc.opendata.arcgis.com",
    "public.colletoncounty.opendata.arcgis.com",
    "vicroadsopendata.vicroadsmaps.opendata.arcgis.com",
    "aampo.mpo.opendata.arcgis.com",
    "bostonopendata.boston.opendata.arcgis.com",
    "waterschap.bovendams.opendata.arcgis.com",
    "bramptonopendata.brampton.opendata.arcgis.com",
    "spatial.cml.opendata.arcgis.com",
    "gis.ecan.opendata.arcgis.com",
    "cityofcommercecityopendata.c3.opendata.arcgis.com",
    "data.dublinohio.opendata.arcgis.com",
    "maps.fallschurch.opendata.arcgis.com",
    "mapss.gahanna.opendata.arcgis.com",
    "cohgis.mycity.opendata.arcgis.com",
    "cityofpasadenaca.pasgis.opendata.arcgis.com",
    "gis.dedham.opendata.arcgis.com",
    "maps.gahanna.opendata.arcgis.com",
    "halifaxopendatacatalogue.hrm.opendata.arcgis.com",
    "honolulu.cchnl.opendata.arcgis.com",
    "lcc.launceston.opendata.arcgis.com",
    "longmontopendata.longmontco.opendata.arcgis.com",
    "data.nftwp.opendata.arcgis.com",
    "geoportaal.ddh.opendata.arcgis.com",
    "lavienne.cg86.opendata.arcgis.com",
    "lapilot.caro.opendata.arcgis.com",
    "opensalem.salem.opendata.arcgis.com",
    "sig.bmo.opendata.arcgis.com",
    "gisdata.cosmo.opendata.arcgis.com",
    "beta.dcgis.opendata.arcgis.com",
    "data.brookline.opendata.arcgis.com",
    "data.grotongis.opendata.arcgis.com",
    "town.mooresvillenc.opendata.arcgis.com",
    "wakeopen.wake.opendata.arcgis.com",
    "eprinkrez.vrk.opendata.arcgis.com",
    "banen.banedanmark.opendata.arcgis.com",
    "maps.acpa.opendata.arcgis.com",
    "gisdata.arlgis.opendata.arcgis.com",
    "data.carver.opendata.arcgis.com",
    "ccbcc.collierbcc.opendata.arcgis.com",
    "countyassessordatasharingsite.assessoroffice.opendata.arcgis.com",
    "data.countyofriverside.opendata.arcgis.com",
    "data.dogis.opendata.arcgis.com",
    "fultoncountygadataportal.fulcogis.opendata.arcgis.com",
    "data.galwaycoco.opendata.arcgis.com",
    "hcgistn.hamcogis.opendata.arcgis.com",
    "parcels.lunacountynm.opendata.arcgis.com",
    "gis.madisonva.opendata.arcgis.com",
    "mauicountydataportal.malama.opendata.arcgis.com",
    "montereycountyopendata.montereyco.opendata.arcgis.com",
    "roscommon.roscoco.opendata.arcgis.com",
    "gis.sbcountydpw.opendata.arcgis.com",
    "odb.sarpy.opendata.arcgis.com",
    "sonomacountyopendata.sonomamap.opendata.arcgis.com",
    "openstlco.stlcogis.opendata.arcgis.com",
    "gis.wardnd.opendata.arcgis.com",
    "maps.waukeshacounty.opendata.arcgis.com",
    "gis.woodwi.opendata.arcgis.com",
    "gis.nci.opendata.arcgis.com",
    "test.onf.opendata.arcgis.com",
    "usfs.usda-fs.opendata.arcgis.com",
    "andes.ccrp.opendata.arcgis.com",
    "opendhn.dhnetwork.opendata.arcgis.com",
    "fsp.bmgf.opendata.arcgis.com",
    "globalforestwatch.gfw.opendata.arcgis.com",
    "onswater.bovendams.opendata.arcgis.com",
    "ohdr.nethope.opendata.arcgis.com",
    "d3.d3.opendata.arcgis.com",
    "vts.bmgf.opendata.arcgis.com",
    "demo.gobiernoregional.opendata.arcgis.com",
    "incogsopendatasite.incog.opendata.arcgis.com",
    "www.cavgp.opendata.arcgis.com",
    "gis.ramathanadiv.opendata.arcgis.com",
    "opendatasigsa.sigsapue.opendata.arcgis.com",
    "data.gaiaose.opendata.arcgis.com",
    "gis.cccommission.opendata.arcgis.com",
    "dataportal.mtc.opendata.arcgis.com",
    "ssmmaopendata.ssmma-gis.opendata.arcgis.com",
    "arc.garc.opendata.arcgis.com",
    "alabama.pluton.opendata.arcgis.com",
    "beta.cdphgis.opendata.arcgis.com",
    "data.myfwc.opendata.arcgis.com",
    "geohubpathfinder.uwyo.opendata.arcgis.com",
    "data.idwr.opendata.arcgis.com",
    "illinoisepaopendata.illinois-epa.opendata.arcgis.com",
    "indianamap.esristl.opendata.arcgis.com",
    "kygovmaps.kygeonet.opendata.arcgis.com",
    "opendata.somdits.opendata.arcgis.com",
    "njogis.newjersey.opendata.arcgis.com",
    "public.hhsproto.opendata.arcgis.com",
    "tn.tnmap.opendata.arcgis.com",
    "imap.maryland.opendata.arcgis.com",
    "udot.uplan.opendata.arcgis.com",
    "gismaps.vgin.opendata.arcgis.com",
    "washingtonopendata.wa-geoservices.opendata.arcgis.com",
    "gdl.wadshs.opendata.arcgis.com",
    "wyowildlife.wsfd.opendata.arcgis.com",
    "campuslab.tims.opendata.arcgis.com",
    "geoportal.congeo.opendata.arcgis.com"
  ]


  request("http://opendata.arcgis.com/explore.json").then(function(data){
    // do something with handled data
    var sites = JSON.parse(data).sites, feature;

    sites.forEach(function(site,i){
      var url = site.url.replace(/http:\/\//, '');
      if ( pap.indexOf(url) === -1 ) return;

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
