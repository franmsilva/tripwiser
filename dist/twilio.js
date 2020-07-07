"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
var twilio_1 = __importDefault(require("twilio"));
var environment_1 = require("./environment");
exports.sendSMS = function (options) {
    var client = twilio_1.default(environment_1.environment.twilio.sid, environment_1.environment.twilio.token);
    client.messages.create(options, function (err) {
        if (err)
            console.error(err);
    });
};
