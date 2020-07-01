"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connect_1 = __importDefault(require("../connect"));
var Schema = connect_1.default.Schema;
var FlightSchema = new Schema({
    origin: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    destination: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    departureDate: {
        type: Date,
        required: true,
    },
    arrivalDate: {
        type: Date,
        required: true,
    },
    airline: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.default = connect_1.default.model('Flight', FlightSchema);
