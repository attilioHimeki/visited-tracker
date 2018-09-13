const LOCAL_STORAGE_USERDATA_KEY = "map_save_data";

class UserData 
{

    constructor() 
    {
        this.visitedCountries = [];
        this.visitedCities = [];
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

    processAddedLocation(address) 
    {
        if(address.hasOwnProperty("country"))
        {
            let country = address.country;
            if(!this.visitedCountries.includes(country))
            {
                this.visitedCountries.push(country);
            }
        }
        
        if(address.hasOwnProperty("city"))
        {
            let city = address.city;
            if(!this.visitedCities.includes(city))
            {
                this.visitedCities.push(city);

            }
        }

        this.saveToLocalStorage();
    }

    getVisitedCountries()
    {
        return this.visitedCountries.slice();
    }

    hasVisitedCountry(countryName)
    {
        return this.visitedCountries.includes(countryName);
    }

    getVisitedCities()
    {
        return this.visitedCities.slice();
    }

    hasVisitedCity(cityName)
    {
        return this.visitedCities.includes(cityName);
    }

    toJSON()
    {   
        let obj = {
            visitedCountries: this.visitedCountries,
            visitedCities: this.visitedCities
        }

        return JSON.stringify(obj);
    }

    fromJSON(data)
    {
        var obj = JSON.parse(data);

        for (var key in obj) 
        {
            this[key] = obj[key];
        }   

    }

}