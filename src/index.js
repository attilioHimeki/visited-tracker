
const GEOJSON_PATH = 'res/data/countries.geojson.txt';

var popup;
var map;
var mapProvider;

var userData;

var geoJSONData;
var geoJsonFeatureByCountry;
var geoJSONLayer;

window.onload = function()
{
	setupMap();
	setupUserData();
	preloadGeoJsonGeometry();

	initialiseUI();
}

function setupUserData()
{
	userData = new UserData();
	userData.restoreFromLocalStorage();
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
	geoJSONLayer = L.geoJson().addTo(map);
	geoJSONLayer.setStyle({ weight: 1, color:'#3388ff', fill:true});

	loadJSON(GEOJSON_PATH, function(response) 
	{
		geoJSONData = JSON.parse(response);

		geoJsonFeatureByCountry = {};

		for(let i = 0; i < geoJSONData.features.length; i++)
		{
			let feature = geoJSONData.features[i];
			let countryName = feature.properties.ADMIN;
			geoJsonFeatureByCountry[countryName] = feature;
		}

		prefillVisitedCountries();
    });
}

function prefillVisitedCountries()
{
	let countries = userData.getVisitedCountries();

	for(let i = 0; i < countries.length; i++)
	{
		let c = countries[i];
		addCountryToGeoJsonLayer(c);
	}

	refreshVisitedTables();
}

function addCountryToGeoJsonLayer(countryName)
{
	if(geoJsonFeatureByCountry.hasOwnProperty(countryName))
	{
		let feature = geoJsonFeatureByCountry[countryName];
		geoJSONLayer.addData(feature);
	}
}

function onGeoSearchLocationChosen(e)
{
	let locationData = e.location.raw;
	let address = locationData.address;

	userData.processAddedLocation(address);

	let countryName = address.country;
	addCountryToGeoJsonLayer(countryName);

	//queryMap(locationData.display_name)
	refreshVisitedTables();
}

function onMapClick(e) 
{

}

function queryMap(address, callback)
{
	mapProvider
	.search({ query: address })
	.then(function(result) { 
		if(result.length > 0)
		{
			// let info = result[0];
			// let a = info.raw;
			// L.marker([a.lat, a.lon]).addTo(map);

			callback(result[0]);
		}
	});
}

function onLogVisitedCountriesPressed()
{
	console.log(userData.getVisitedCountries())
}