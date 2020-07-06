"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookedTrip = exports.welcomeMail = void 0;
var environment_1 = require("./environment");
var mailgun_js_1 = __importDefault(require("mailgun-js"));
var mg = mailgun_js_1.default({ apiKey: environment_1.environment.mailgun.apikey, domain: environment_1.environment.mailgun.domain, testMode: environment_1.environment.mailgun.test });
exports.welcomeMail = function (to, name) {
    var data = {
        from: '<welcome@tripwiser.com>',
        to: " " + name + " <" + to + ">",
        subject: 'tripWiser welcomes you',
        text: "Hi " + name + " welcome to tripWiser",
        html: "<p> Hi " + name + " welcome to tripWiser</p>"
    };
    mg.messages().send(data, function (error, body) {
        if (error)
            console.error(error);
        console.log(body);
    });
};
exports.bookedTrip = function (to, name, trip) {
    var template = "<p>" + trip.startLocation.cityName + "</p>" + trip.destinations.map(function (destination) { return "<p>" + destination.cityName + "</p>"; }) + ("<p>" + trip.endLocation.cityName + "</p>");
    var data = {
        from: '<welcome@tripwiser.com>',
        to: to + ", " + name,
        subject: 'tripWiser welcomes you',
        text: "Hi " + name + " welcome to tripWiser",
        html: "<p> Hi " + name + ", you booked a trip on tripWiser<p>\n        <p>here are your destinations<p> " + template + "\n        "
    };
    mg.messages().send(data, function (error, body) {
        if (error)
            console.error(error);
        console.log(body);
    });
};
