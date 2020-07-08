"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var trip_model_1 = __importDefault(require("../models/trip.model"));
var reminderWorker = function () {
    return {
        run: function () {
            trip_model_1.default.sendSMSReminder();
        }
    };
};
exports.default = reminderWorker();
