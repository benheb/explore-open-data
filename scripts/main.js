var map;require(["esri/map","dojo/request","esri/geometry/Circle","esri/layers/ArcGISTiledMapServiceLayer","esri/symbols/SimpleFillSymbol","esri/graphic","esri/layers/GraphicsLayer","esri/geometry/Point","esri/SpatialReference","esri/geometry/webMercatorUtils","esri/layers/ArcGISTiledMapServiceLayer","esri/layers/FeatureLayer","dojo/domReady!"],function(e,t,r,o,a,i,s,l,n,c){function u(e){var t={geometry:{x:e.geometry.x,y:e.geometry.y,spatialReference:{wkid:102100}},attributes:{title:e.attributes.title,datasets:e.attributes.datasets_count,url:e.attributes.url,groups:e.attributes.groups_count},symbol:{color:[237,50,133,128],size:Math.min(Math.round(e.attributes.datasets_count/100*40),50),angle:0,xoffset:0,yoffset:0,type:"esriSMS",style:"esriSMSCircle",outline:{color:[210,210,210,170],width:.7,type:"esriSLS",style:"esriSLSSolid"}}},r=new i(t);g.add(r)}function p(e,t){var r=e.symbol;t?(r.color.a=.75,r.outline.width=3,r.outline.color.a=1,e.setSymbol(r)):(r.color.a=.5,r.outline.width=1,r.outline.color.a=.85,e.setSymbol(r))}function y(e){var t=e.graphic.attributes.datasets,r=e.graphic.attributes.title,o=e.graphic.attributes.groups;$("#title").html(r),$("#groups").html("Open Data Groups: "+o),$("#count").html("Datasets: "+t)}function d(e){""!==e.graphic.attributes.url&&null!==e.graphic.attributes.url&&window.open(e.graphic.attributes.url)}map=new e("map",{center:[-50.049,32.485],zoom:3});var m=new o("http://studio.esri.com/arcgis/rest/services/World/WorldBasemapBlack/MapServer");map.addLayer(m);var g=new s({id:"circles"});map.addLayer(g),g.on("mouse-over",function(e){p(e.graphic,!0),y(e)}),g.on("mouse-out",function(e){p(e.graphic,!1)}),g.on("click",function(e){d(e)}),g.on("mouse-out",function(){}),t("http://opendata.arcgis.com/explore.json").then(function(e){console.log("JSON.parse(data)",JSON.parse(e));var t,r=JSON.parse(e).Features;r.forEach(function(e){var r,o;e.geometry.coordinates[0]<200&&e.geometry.coordinates[0]>-200?(o=c.lngLatToXY(e.geometry.coordinates[0],e.geometry.coordinates[1]),r={x:o[0],y:o[1],type:"point",spatialReference:{latestWkid:3857,wkid:102100}}):(console.log("else"),r={x:e.geometry.coordinates[0],y:e.geometry.coordinates[1],type:"point",spatialReference:{latestWkid:3857,wkid:102100}}),console.log("geom",r.x),t={geometry:r,attributes:e.properties},u(t)})})});