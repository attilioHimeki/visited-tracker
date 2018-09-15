"use strict";

const LOCATION_ADDRESS_TYPE = 
{
  CONTINENT: "continent",
  COUNTRY: "country",
  COUNTY: "county",
  STATE: "state",
  CITY: "city",
  VILLAGE: "village",
  MUSEUM: "museum",
  CASTLE: "castle",
  FOREST: "forest",
  PARK: "park",
  BAY: "bay",
  RETAIL: "retail",
  RESTAURANT: "restaurant",
  SUBURB: "suburb",
  STATION: "station",
  NONE: "none"
};

if (Object.freeze)
{
  Object.freeze(LOCATION_ADDRESS_TYPE);
}

const prioritisedTypesList = [
  LOCATION_ADDRESS_TYPE.FOREST,
  LOCATION_ADDRESS_TYPE.PARK,
  LOCATION_ADDRESS_TYPE.RESTAURANT,
  LOCATION_ADDRESS_TYPE.MUSEUM,
  LOCATION_ADDRESS_TYPE.CASTLE,
  LOCATION_ADDRESS_TYPE.STATION,
  LOCATION_ADDRESS_TYPE.BAY,
  LOCATION_ADDRESS_TYPE.RETAIL,
  LOCATION_ADDRESS_TYPE.SUBURB,
  LOCATION_ADDRESS_TYPE.VILLAGE,
  LOCATION_ADDRESS_TYPE.CITY,
  LOCATION_ADDRESS_TYPE.COUNTY,
  LOCATION_ADDRESS_TYPE.STATE,
  LOCATION_ADDRESS_TYPE.COUNTRY,
  LOCATION_ADDRESS_TYPE.CONTINENT];

class VisitedLocationEntry
{
  constructor(address)
  {
    this.type = this.inferTypeFromAddress(address);
    this.address = address;
  }

  getCity()
  {
    return this.address.city;
  }

  getCountry()
  {
    return this.address.country;
  }

  inferTypeFromAddress(address)
  {

    for (let i = 0; i < prioritisedTypesList.length; i++) 
    {
      let type = prioritisedTypesList[i];
      if(address.hasOwnProperty(type))
        return type;
    }

    return LOCATION_ADDRESS_TYPE.NONE;
  }
}