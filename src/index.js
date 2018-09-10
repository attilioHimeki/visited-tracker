
const GEOJSON_PATH = 'res/data/countries.geojson.txt';

var popup;
var map;
var mapProvider;

var userData;
var geoJSONData;

window.onload = function()
{
	setupMap();
	preloadGeoJsonGeometry();

	userData = new UserData();
}

function setupMap()
{	
	const southWest = L.latLng(-90, -180);
    const northEast = L.latLng(90, 180);
	let bounds = L.latLngBounds(southWest, northEast);

	map = L.map('mapid', {
		center: [51.505, -0.09],
		zoom: 3,
		zoomControl: true,
		closePopupOnClick: true,
		maxBounds: bounds,
		minZoom:1,
		maxZoom: 13,
		maxBoundsViscosity:1.0
	});

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 13,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);

	popup = L.popup();

    map.on('click', onMapClick);

    let GeoSearchControl = window.GeoSearch.GeoSearchControl;
    let OpenStreetMapProvider = window.GeoSearch.OpenStreetMapProvider;
    
    mapProvider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
		provider: mapProvider,
		style: 'button',
		autoComplete: true,
		autoCompleteDelay: 250,
		keepResult: false,
		autoClose: true,
		retainZoomLevel: false,
  		animateZoom: false, 
    });

	map.addControl(searchControl);
	
	map.on('geosearch/showlocation', onGeoSearchLocationChosen);
}

function preloadGeoJsonGeometry() 
{
	loadJSON(GEOJSON_PATH, function(response) 
	{
		geoJSONData = JSON.parse(response);
		
		L.geoJson(geoJSONData, { weight: 1, color:'#3388ff', fill:true }).addTo(map);
    });
}

function onGeoSearchLocationChosen(e)
{
	let locationData = e.location.raw;
	let address = locationData.address;

	userData.processAddedLocation(address);

	queryMap(locationData.display_name)
	
}

function onMapClick(e) 
{

}

function queryMap(address)
{
	mapProvider
	.search({ query: address })
	.then(function(result) { 
		if(result.length > 0)
		{
			let info = result[0];
			let a = info.raw;
			L.marker([a.lat, a.lon]).addTo(map);
		}
	});
}

function onLogVisitedCountriesPressed()
{
	console.log(userData.getVisitedCountries())
}