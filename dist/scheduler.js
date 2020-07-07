"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cron_1 = __importDefault(require("cron"));
var reminderWorkers_1 = __importDefault(require("./workers/reminderWorkers"));
var CronJob = cron_1.default.CronJob;
var schedulerFactory = function () {
    return {
        start: function () {
            new CronJob('30 20 * * *', function () {
                console.log("running trip notification worker " + new Date());
                reminderWorkers_1.default.run();
            }, null, true, '');
        },
    };
};
exports.default = schedulerFactory;
