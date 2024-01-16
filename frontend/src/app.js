// imports
import * as jsyaml from 'js-yaml';

// load the config file
const config = await fetch('/config.yaml')
  .then(response =>  response.text())
  .then(data => jsyaml.load(data))
  .catch(error => console.error('Error loading config.yaml:', error));

// Basemap
// future scope: replace w/ template placeholders (e.g. {{mapbox_token}})
var map = L.map('map').setView(config.map.setView, config.map.setZoom);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Initialize Leaflet Draw
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

// container for all current polygons
var polygonId = 0;
var polygonMap = {};

// Event handler for drawing polygon
map.on(L.Draw.Event.CREATED, function (e) {
    drawnItems.addLayer(e.layer);
    polygonMap[polygonId] = layer.toGeoJSON();
    polygonId++;
});

// Event handler for editing polygon
map.on(L.Draw.Event.EDITED, function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        var polygonData = layer.toGeoJSON();
        var index = polygons.indexOf(polygonData);
        if (index > -1) {
            polygons[index] = polygonData;
        }
    });
});

// Event handler for deleting polygon
map.on(L.Draw.Event.DELETED, function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        var polygonData = layer.toGeoJSON();
        var index = polygons.indexOf(polygonData);
        if (index > -1) {
            polygons.splice(index, 1);
        }
    });
});

// Button Click Events
$('.app-button').click(function () {
    var endpoint = $(this).data('endpoint');
    // Make an AJAX request to the specified endpoint (replace with your actual endpoint logic)
    $.get(endpoint, function (response) {
        // Handle the response as needed
        console.log(response);
        // Populate the table with response data
        populateTable(response);
    });
});

// Initialize DataTable
$(document).ready(function () {
    $('#dataTable').DataTable();
});

// Function to populate the table
function populateTable(data) {
    // Clear existing rows
    $('#dataTable tbody').empty();
    // Populate the table with new data
    data.forEach(function (row) {
        var rowHtml = '<tr>';
        rowHtml += '<td>' + row.column1 + '</td>';
        rowHtml += '<td>' + row.column2 + '</td>';
        // Add more columns as needed
        rowHtml += '</tr>';
        $('#dataTable tbody').append(rowHtml);
    });
}