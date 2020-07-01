"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connect_1 = __importDefault(require("../connect"));
var Schema = connect_1.default.Schema;
var TripSchema = new Schema({
    creator: {
        type: String,
        required: true,
    },
    booked: {
        type: Boolean,
        required: true,
    },
    startLocation: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    endLocation: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    destinations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Place',
        },
    ],
    flights: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Flight',
        },
    ],
    currency: String,
    price: Number,
}, { timestamps: true });
exports.default = connect_1.default.model('Trip', TripSchema);
