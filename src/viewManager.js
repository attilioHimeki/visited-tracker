var tabsGroup;
var visitedCountriesTable;
var visitedCitiesTable;

function initialiseUI()
{
    tabsGroup = $( "#tabs" );
    tabsGroup.tabs();

    visitedCountriesTable = $('#visitedCountriesTable');
    visitedCitiesTable = $('#visitedCitiesTable');
}

function refreshVisitedTables()
{
    let countriesArray = userData.getVisitedCountries();
    let citiesArray = userData.getVisitedCities();

    refreshTable(visitedCountriesTable, countriesArray);
	refreshTable(visitedCitiesTable, citiesArray);
}

function refreshTable(table, itemsArray)
{
    table.empty();

    let itemsLen = itemsArray.length;
	for(let i = 0; i < itemsLen; i++)
	{
		let item = itemsArray[i];
		let row = $('<tr></tr>');
		table.append( row );
        let cell = $('<td>'+item+'</td>')
        row.append( cell );
	}
}