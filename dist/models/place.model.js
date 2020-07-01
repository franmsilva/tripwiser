"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connect_1 = __importDefault(require("../connect"));
var Schema = connect_1.default.Schema;
var PlaceSchema = new Schema({
    airportId: {
        type: String,
        unique: true,
    },
    airportName: {
        type: String,
    },
    location: {
        type: String,
    },
    cityId: {
        type: String,
    },
    cityName: {
        type: String,
    },
    countryId: {
        type: String,
    },
    countryName: {
        type: String,
    },
}, { timestamps: true });
exports.default = connect_1.default.model('places', PlaceSchema);
