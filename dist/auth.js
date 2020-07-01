"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_model_1 = __importDefault(require("./models/user.model"));
var SECRETKEY = process.env.SECRETKEY || 'not safe use env';
exports.getUserFromToken = function (token) {
    try {
        if (!token)
            return null;
        var payload = jsonwebtoken_1.default.verify(token, SECRETKEY);
        return user_model_1.default.findById(payload._id);
    }
    catch (error) {
        return null;
    }
};
