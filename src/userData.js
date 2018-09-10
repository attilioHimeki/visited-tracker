class UserData 
{

    constructor() 
    {
        this.visitedCountries = [];
        this.visitedCities = [];
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

    }

    getVisitedCountries()
    {
        return this.visitedCountries;
    }

    toJSON()
    {

    }

    fromJSON()
    {
        
    }

}