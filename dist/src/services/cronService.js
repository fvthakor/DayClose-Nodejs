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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
var cron = require('node-cron');
cron.schedule('55 23 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log('running a task every minute');
    const tasks = yield models_1.Task.find({ autoCreate: 'true' });
    const newTask = tasks.map((task) => {
        var date = new Date();
        const t = task.toJSON();
        delete t._id;
        delete t.__v;
        date.setDate(date.getDate() + 1);
        return Object.assign(Object.assign({}, t), { taskDate: date, autoCreate: 'false', image2: t.image2.replace(`${process.env.SERVER_URL}/`, ""), image1: t.image1.replace(`${process.env.SERVER_URL}/`, "") });
    });
    //console.log('newTask',newTask);
    const createdTasks = yield models_1.Task.insertMany(newTask);
    //console.log('createdTasks',createdTasks);
}));
