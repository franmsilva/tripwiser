const Place = require('../models/place.model.ts');
const skyPlaces = require('./places.json');

const seedDB = (places) => {
  // eslint-disable-next-line array-callback-return
  places.Continents.map((continent) => {
    // eslint-disable-next-line array-callback-return
    continent.Countries.map((country) => {
      // eslint-disable-next-line array-callback-return
      country.Cities.map((city) => {
        city.Airports.map(async (airport) => {
          await Place.create({
            cityId: airport.CityId,
            cityName: city.Name,
            countryId: airport.CountryId,
            countryName: country.Name,
            location: airport.Location,
            airportId: airport.Id,
            aiportName: airport.Name,
          });
        });
      });
    });
  });
  // eslint-disable-next-line no-console
  console.log('All places added to database 🧳');
};

seedDB(skyPlaces);
