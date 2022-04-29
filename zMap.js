function initCallback() {

  var map = new ZMap('MapdivId', zMapsSdk);
  map.loadMap();
  printCountryTable(countries);
  loadingRender();
}
function newMarker(x, y, z, w) {
  var Marker = new ZMarker(x, y, z);
  Marker.width = 25;
  Marker.height = 25;
  Marker.setIcon(url);
  Marker.setCustomInfoWindowView(w);
  return Marker;
}

function showAirport(features) {
  var coordinateArray = features.geometry.coordinates;
  var airportName;
  if (features.properties["name:en"] === features.properties.name || features.properties["name:en"] === undefined)
    airportName = features.properties.name + `-` + features.properties.iata;
  else
    airportName =
      features.properties["name:en"] + `-` + features.properties.iata +
      `<br>` +
      features.properties.name;
  if (typeof (coordinateArray[0]) === "number") {
    var temp = [coordinateArray[1], coordinateArray[0]];
    coordinateArray = [];
    coordinateArray.push(temp)
    var Marker = newMarker('id', temp[0], temp[1], airportName)
    showInZoom(coordinateArray, Marker);
    console.log(coordinateArray);

  }
  else {
    for (let i = 0; i < coordinateArray.length; i++) {
      for (let k = 0; k < coordinateArray[i].length; k++) {
        let temp = coordinateArray[i][k][0];
        coordinateArray[i][k][0] = coordinateArray[i][k][1];
        coordinateArray[i][k][1] = temp;
      }
      var Marker = newMarker('id', coordinateArray[0][0][0], coordinateArray[0][0][1], airportName);
      showInZoom(coordinateArray[i], Marker);
    }
  }

}

function showInZoom(coordinateArray, Marker) {

  var map = new ZMap('MapdivId', zMapsSdk);
  map.loadMap();
  map.onLoad(function () {

    // if (Marker !== 'false')
    map.addMarker(Marker);
    var zMapsShape = new ZMapsShape('shapeId', ZMapsShapeType.Polygon);
    zMapsShape.setCoordinatesArray(coordinateArray);

    zMapsShape.setFill(true);
    zMapsShape.setStrokeColor('black');
    zMapsShape.setFillColor('rgba(66, 153, 245,0.3)');
    zMapsShape.setStrokeWidth(2);
    zMapsShape.setShapeOpacity(1);

    map.addShape(zMapsShape);

    map.fitToShapes(zMapsShape, 20);

  });
}

const b64toBlob = (sliceSize = 512) => {
  const contentType = 'image/png';
  const b64Data =
    `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`
    ;

  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return URL.createObjectURL(blob);
}
var url = b64toBlob();

function showAirports(country, num) {
  var map = new ZMap('MapdivId', zMapsSdk);
  map.loadMap();
  map.onLoad(async () => {
    openloading('fetching nodes...');
    var Markers = [];
    var latLonArray = [];
    console.log(airportData[num], num, country)
    features = airportData[num].features;
    console.log(features);


    await delay(1000);
    printAirportTable(country, features);
    for (var i = 0; i < features.length; i++) {
      if (features[i].geometry.type === "Point") {
        latLonArray.push([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]]);
      }
      else {
        latLonArray.push([features[i].geometry.coordinates[0][0][1], features[i].geometry.coordinates[0][0][0]]);
      }
    }
    for (var i = 0; i < latLonArray.length; i++) {
      if (features[i].properties["name:en"] === features[i].properties.name || features[i].properties["name:en"] === undefined)
        airportName = features[i].properties.name + `-` + features[i].properties.iata;
      else
        airportName =
          features[i].properties["name:en"] + `-` + features[i].properties.iata +
          `<br>` +
          features[i].properties.name;
      Markers[i] = new ZMarker(i, latLonArray[i][0], latLonArray[i][1]);
      Markers[i].width = 25;
      Markers[i].height = 25;
      Markers[i].setIcon(url);
      Markers[i].setCustomInfoWindowView(airportName);
    }
    var ZMapsMarkerOptionCluster = new ZMapsMarkerOption(ZMapsMarkerType.Cluster);
    var response = map.addMarkers('ClusterId', Markers, ZMapsMarkerOptionCluster);
    map.fitToAllMarkers();
    closeloading();

  });
}

function loadingRender() {
  document.getElementById("_loadingBox").innerHTML =
    `
  <div class="pin" id="pin"></div>
  <div class="pulse" id="pulse"></div>
  <h3 id="_loadingScript"></h3>
  `;
  document.getElementById("_loadingBox").className = "loadingBox";
}