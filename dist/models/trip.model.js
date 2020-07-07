"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connect_1 = __importDefault(require("../connect"));
var user_model_1 = __importDefault(require("./user.model"));
var environment_1 = require("../environment");
var twilio_1 = require("../twilio");
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
TripSchema.statics.sendSMSReminder = function () {
    return __awaiter(this, void 0, void 0, function () {
        var dayold, tripsReminded, ids, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dayold = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
                    return [4, Trip.find({ created_at: { $gte: dayold } })];
                case 1:
                    tripsReminded = _a.sent();
                    ids = [];
                    tripsReminded.reduce(function (trip) {
                        if (ids.includes(trip.creator))
                            return trip;
                        ids = __spreadArrays(ids, [trip.creator]);
                        return trip;
                    });
                    if (!(ids.length > 0)) return [3, 3];
                    return [4, user_model_1.default.find(ids)];
                case 2:
                    users = _a.sent();
                    sendToUsers(users);
                    _a.label = 3;
                case 3: return [2];
            }
        });
    });
};
var sendToUsers = function (users) {
    users.forEach(function (user) {
        if (!user.phoneNumber)
            return;
        var option = {
            to: user.phoneNumber,
            from: environment_1.environment.twilio.phoneNumber,
            body: "Hello " + user.firstName + " from tripWiser ju still have open trips in you wishlist",
        };
        twilio_1.sendSMS(option);
    });
};
var Trip = connect_1.default.model('Trip', TripSchema);
exports.default = Trip;
