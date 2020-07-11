import Place from '../models/place.model';
const skyPlaces = require('../../places.json');

const seedDB = (places: any) => {
  // eslint-disable-next-line array-callback-return
  const formattedData: any = [];
  places.Continents.forEach((continent: any) => {
    // eslint-disable-next-line array-callback-return
    continent.Countries.forEach((country: any) => {
      // eslint-disable-next-line array-callback-return
      country.Cities.forEach((city: any) => {
        city.Airports.forEach((airport: any) => {
          formattedData.push({
            cityId: airport.CityId,
            cityName: city.Name,
            countryId: airport.CountryId,
            countryName: country.Name,
            location: airport.Location,
            airportId: airport.Id,
            airportName: airport.Name,
          });
        });
      });
    });
  });

  // TODO: Handle duplicate airport ID error
  Place.create(formattedData)
    .catch((err) => {
      console.error(err);
    })
    .finally(() => console.log('All places added to database 🧳'));
};

seedDB(skyPlaces);
