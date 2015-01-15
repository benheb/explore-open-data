//MAP! 
var map;
require(["esri/map", "dojo/request", "esri/geometry/Circle", "esri/symbols/SimpleFillSymbol", 
  "esri/graphic", "esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/SpatialReference", "esri/geometry/webMercatorUtils",
  "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/FeatureLayer", "dojo/domReady!"], function(Map, request, Circle, SimpleFillSymbol, 
    Graphic, GraphicsLayer, Point, SpatialReference, webMercatorUtils) { 

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
    'eprinkrez.vrk.opendata.arcgis.com',
    'alabama.pluton.opendata.arcgis.com',
    'maps.acpa.opendata.arcgis.com',
    'aampo.mpo.opendata.arcgis.com',
    'gisdata.arlgis.opendata.arcgis.com',
    'banen.banedanmark.opendata.arcgis.com',
    'gis.bexar.opendata.arcgis.com',
    'bostonopendata.boston.opendata.arcgis.com',
    'open.brampton.opendata.arcgis.com',
    'spatial.cml.opendata.arcgis.com',
    'gis.ecan.opendata.arcgis.com',
    'gis.cccommission.opendata.arcgis.com',
    'data.carver.opendata.arcgis.com',
    'gisdata.azwater.opendata.arcgis.com',
    'andes.ccrp.opendata.arcgis.com',
    'data.alexgis.opendata.arcgis.com',
    'data.annapolis.opendata.arcgis.com',
    'data.bellingham.opendata.arcgis.com',
    'opendata.bismarck.opendata.arcgis.com',
    'opendata.boise.opendata.arcgis.com',
    'public.chesva.opendata.arcgis.com',
    'data.dentontxgis.opendata.arcgis.com',
    'data.dublinohio.opendata.arcgis.com',
    'maps.fallschurch.opendata.arcgis.com',
    'mapss.gahanna.opendata.arcgis.com',
    'cohgis.mycity.opendata.arcgis.com',
    'data.cityoflynchburg.opendata.arcgis.com',
    'cityofpasadenaca.pasgis.opendata.arcgis.com',
    'data.ral.opendata.arcgis.com',
    'geographicdata.slocity.opendata.arcgis.com',
    'gisdata.cityofstafford.opendata.arcgis.com',
    'city.tampa.opendata.arcgis.com',
    'data.cyc.opendata.arcgis.com',
    'clt.charlotte.opendata.arcgis.com',
    'countyassessordatasharingsite.assessoroffice.opendata.arcgis.com',
    'data.countyofriverside.opendata.arcgis.com',
    'gis.slocounty.opendata.arcgis.com',
    'd3.d3.opendata.arcgis.com',
    'gis.dedham.opendata.arcgis.com',
    'data.deptofed.opendata.arcgis.com',
    'opendhn.dhnetwork.opendata.arcgis.com',
    'data.dogis.opendata.arcgis.com',
    'gisdata.evvc.opendata.arcgis.com',
    'fsp.bmgf.opendata.arcgis.com',
    'fultoncountygadataportal.fulcogis.opendata.arcgis.com',
    'data.galwaycoco.opendata.arcgis.com',
    'geohubpathfinder.uwyo.opendata.arcgis.com',
    'catalogue.hrm.opendata.arcgis.com',
    'hcgistn.hamcogis.opendata.arcgis.com',
    'openharfordct.hartfordgis.opendata.arcgis.com',
    'hawaiistatewidegisopendataportal.histategis.opendata.arcgis.com',
    'data.hslhrt.opendata.arcgis.com',
    'data.idfggis.opendata.arcgis.com',
    'data.idwr.opendata.arcgis.com',
    'illinoisepaopendata.illinois-epa.opendata.arcgis.com',
    'incogsopendatasite.incog.opendata.arcgis.com',
    'kygovmaps.kygeonet.opendata.arcgis.com',
    'data.kitcogis.opendata.arcgis.com',
    'lcc.launceston.opendata.arcgis.com',
    'gis.madisonva.opendata.arcgis.com',
    'mauicountydataportal.malama.opendata.arcgis.com',
    'opendata.somdits.opendata.arcgis.com',
    'montereycountyopendata.montereyco.opendata.arcgis.com',
    'data.moco.opendata.arcgis.com',
    'gis.nci.opendata.arcgis.com',
    'njogis.newjersey.opendata.arcgis.com',
    'data.nftwp.opendata.arcgis.com',
    'onswater.bovendams.opendata.arcgis.com',
    'geoportaal.ddh.opendata.arcgis.com',
    'data.odiqueensland.opendata.arcgis.com',
    'lapilot.caro.opendata.arcgis.com',
    'ohdr.nethope.opendata.arcgis.com',
    'opensalem.salem.opendata.arcgis.com',
    'public.colletoncounty.opendata.arcgis.com',
    'data.drcmetro.opendata.arcgis.com',
    'data.pncc.opendata.arcgis.com',
    'gisdata.piercecowa.opendata.arcgis.com',
    'sevilla.idesevilla.opendata.arcgis.com',
    'gis.princegeorges.opendata.arcgis.com',
    'gis.ramathanadiv.opendata.arcgis.com',
    'rinkimuduomenys.vrk.opendata.arcgis.com',
    'roscommon.roscoco.opendata.arcgis.com',
    'gis.slcgov.opendata.arcgis.com',
    'gis.sbcountydpw.opendata.arcgis.com',
    'rdw.sandag.opendata.arcgis.com',
    'odb.sarpy.opendata.arcgis.com',
    'data.saukgis.opendata.arcgis.com',
    'sig.bmo.opendata.arcgis.com',
    'sonomacountyopendata.sonomamap.opendata.arcgis.com',
    'ssmmaopendata.ssmma-gis.opendata.arcgis.com',
    'openstlco.stlcogis.opendata.arcgis.com',
    'equipo.practica.opendata.arcgis.com',
    'arc.garc.opendata.arcgis.com',
    'beta.dcgis.opendata.arcgis.com',
    'imap.maryland.opendata.arcgis.com',
    'vts.bmgf.opendata.arcgis.com',
    'data.brookline.opendata.arcgis.com',
    'data.grotongis.opendata.arcgis.com',
    'town.mooresvillenc.opendata.arcgis.com',
    'udot.uplan.opendata.arcgis.com',
    'geoportal.congeo.opendata.arcgis.com',
    'data.vtanr.opendata.arcgis.com',
    'vicroadsopendata.vicroadsmaps.opendata.arcgis.com',
    'gismaps.vgin.opendata.arcgis.com',
    'vtransparency.vtrans.opendata.arcgis.com',
    'washingtonopendata.wa-geoservices.opendata.arcgis.com',
    'gdl.wadshs.opendata.arcgis.com',
    'data.wake.opendata.arcgis.com',
    'gis.wardnd.opendata.arcgis.com',
    'opendata.wgs.opendata.arcgis.com',
    'gisweb.westspringfield.opendata.arcgis.com',
    'maps.waukeshacounty.opendata.arcgis.com',
    'data.wpsgn.opendata.arcgis.com',
    'wyowildlife.wsfd.opendata.arcgis.com',
    'data.gaiaose.opendata.arcgis.com',
    'library.muroran.opendata.arcgis.com',
    'data.nagareyamamidori.opendata.arcgis.com',
    'dataportal.mtc.opendata.arcgis.com',
    'maps.gahanna.opendata.arcgis.com',
    'www.cavgp.opendata.arcgis.com',
    'tn.tnmap.opendata.arcgis.com',
    'public.hhsproto.opendata.arcgis.com',
    'test.onf.opendata.arcgis.com',
    'data.myfwc.opendata.arcgis.com',
    'honolulu.cchnl.opendata.arcgis.com'
  ]


  request("http://opendata.arcgis.com/explore.json").then(function(data){
    // do something with handled data
    var sites = JSON.parse(data).sites, feature;

    sites.forEach(function(site,i){
      var url = site.url.replace(/http:\/\//, '');
      if ( pap.indexOf(url) === -1 ) return;

      //if (site.title == "Capsule Corp." || site.title == "FWC GIS & Mapping Data Downloads") {

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

    //}

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
      if(gra.attributes && gra.attributes.id === "selectedFeature"){
        map.graphics.remove( gra );
      }
    }
  });
  }
   
});
