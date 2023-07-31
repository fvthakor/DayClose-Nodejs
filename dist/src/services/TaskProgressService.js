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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const Service_1 = __importDefault(require("./Service"));
class TaskProgressService extends Service_1.default {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskProgress = yield models_1.TaskProgress.create(data);
                if (taskProgress) {
                    yield models_1.Task.updateOne({ _id: data.task }, { status: data.taskStatus });
                }
                return this.response({ code: 200, message: 'TaskProgress added successfully', data: taskProgress });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('test call');
                let { page, limit, query } = req.query;
                let skip = page && typeof page === 'string' ? Number(page) : 1;
                const limit2 = limit && typeof limit === 'string' ? Number(limit) : 10;
                skip = (skip - 1) * limit2;
                let where = {};
                if (typeof query === 'string' && query.trim() !== '') {
                    where['$or'] = [
                        { "pincode": { $regex: new RegExp(query, "ig") } },
                    ];
                }
                console.log(where);
                const taskProgress = yield models_1.TaskProgress.find().skip(skip).limit(limit2).populate('task');
                return this.response({ code: 200, message: 'Task Progress list', data: taskProgress });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    taskStatus(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, limit, query } = req.query;
                let skip = page && typeof page === 'string' ? Number(page) : 1;
                const limit2 = limit && typeof limit === 'string' ? Number(limit) : 10;
                skip = (skip - 1) * limit2;
                let where = {};
                if (typeof query === 'string' && query.trim() !== '') {
                    where['$or'] = [
                        { "pincode": { $regex: new RegExp(query, "ig") } },
                    ];
                }
                //console.log(req.params.id);
                var wherecheck = { task: req.params.id };
                const taskProgress = yield models_1.TaskProgress.find(wherecheck).skip(skip).limit(limit2).populate('task');
                return this.response({ code: 200, message: 'Task Progress list', data: taskProgress });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskProgress = yield models_1.TaskProgress.findById(id).populate('task');
                return taskProgress ? this.response({ code: 200, message: 'Task progress by id', data: taskProgress })
                    : this.response({ code: 500, message: 'Task progress not found', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const taskProgress = await TaskProgress.findByIdAndUpdate(id, data, { new: true });
                return this.response({ code: 200, message: 'Task progress updated successfully', data: [] });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskProgress = yield models_1.TaskProgress.findByIdAndRemove(id);
                return this.response({ code: 200, message: 'Task progress deleted successfully', data: taskProgress });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
}
exports.default = new TaskProgressService();
