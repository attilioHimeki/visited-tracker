"use strict";

const LOCAL_STORAGE_USERDATA_KEY = "map_save_data";

class UserData 
{

    constructor() 
    {
        this.visitedLocations = [];

        this.visitedCountriesCache = [];
        this.visitedCitiesCache = [];
    }
    
    restoreFromLocalStorage()
    {
        let savedData = localStorage.getItem(LOCAL_STORAGE_USERDATA_KEY);

        if(savedData !== null)
        {
            this.fromJSON(savedData);
        }
    }

    saveToLocalStorage()
    {
        let data = this.toJSON();

        localStorage.setItem(LOCAL_STORAGE_USERDATA_KEY, data);
    }

    processAddedLocation(visitedLocationEntry) 
    {
        this.visitedLocations.push(visitedLocationEntry);

        this.addToCaches(visitedLocationEntry);

        this.saveToLocalStorage();
    }

    addToCaches(visitedLocationEntry)
    {
        let city = visitedLocationEntry.getCity();
        let country = visitedLocationEntry.getCountry();

        if(city !== undefined)
        {
            if(!this.visitedCitiesCache.includes(city))
            {
                this.visitedCitiesCache.push(city);
            }
        }

        if(country !== undefined)
        {
            if(!this.visitedCountriesCache.includes(country))
            {
                this.visitedCountriesCache.push(country);
            }
        }

    }

    refreshCaches()
    {
        this.visitedCitiesCache = [];

        let locationsAmount = this.visitedLocations.length;
        for(let i = 0; i < locationsAmount; i++)
        {
            let loc = this.visitedLocations[i];

            this.addToCaches(loc);
        }
    }

    getVisitedCountries()
    {
        return this.visitedCountriesCache.slice();
    }

    hasVisitedCountry(countryName)
    {
        return this.visitedCountriesCache.includes(countryName);
    }

    getVisitedCities()
    {
        return this.visitedCitiesCache.slice();
    }

    hasVisitedCity(cityName)
    {
        return this.visitedCitiesCache.includes(cityName);
    }

    toJSON()
    {   
        let obj = {
            visitedLocations: this.visitedLocations
        }
        
        return JSON.stringify(obj);
    }

    fromJSON(data)
    {
        var obj = JSON.parse(data);

        if(obj.hasOwnProperty("visitedLocations"))
        {
            let locations = obj.visitedLocations;
            let locationsAmount = locations.length;
            
            for(let i = 0; i < locationsAmount; i++)
            {
                let loc = locations[i];
                let visitedLocationEntry = new VisitedLocationEntry(loc.address);
                this.processAddedLocation(visitedLocationEntry)
            }
        }
       

    }

}