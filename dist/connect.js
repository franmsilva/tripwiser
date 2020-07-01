"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var environment_1 = require("./environment");
mongoose_1.default.connect(environment_1.environment.database.uri, environment_1.environment.database.config);
var db = mongoose_1.default.connection;
db.once('open', function () {
    console.log('MongoDB Atlas connection established!');
});
db.on('error', function () {
    console.error('MongoDB Atlas connection error!');
});
exports.default = mongoose_1.default;
