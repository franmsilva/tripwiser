"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var place_model_1 = __importDefault(require("../models/place.model"));
var skyPlaces = require('../../places.json');
var seedDB = function (places) {
    var formattedData = [];
    places.Continents.forEach(function (continent) {
        continent.Countries.forEach(function (country) {
            country.Cities.forEach(function (city) {
                city.Airports.forEach(function (airport) {
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
    place_model_1.default.create(formattedData)
        .catch(function (err) {
        console.error(err);
    })
        .finally(function () { return console.log('All places added to database 🧳'); });
};
seedDB(skyPlaces);
