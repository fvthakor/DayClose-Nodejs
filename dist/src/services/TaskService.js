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
class TaskService extends Service_1.default {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (data.subCategory.trim() === '') {
                    delete data.subCategory;
                }
                console.log('data', data);
                const category = yield models_1.Task.create(data);
                return this.response({ code: 201, message: 'Task added successfully!', data: category });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, limit, query, taskDate } = req.query;
                let skip = page && typeof page === 'string' ? Number(page) : 1;
                const limit2 = limit && typeof limit === 'string' ? Number(limit) : 10;
                skip = (skip - 1) * limit2;
                let where = { store: req.storeId };
                if (typeof query === 'string' && query.trim() !== '') {
                    where['$or'] = [
                        { "status": { $regex: new RegExp(query, "ig") } },
                    ];
                }
                if (typeof taskDate === 'string' && taskDate.trim() !== '') {
                    where['taskDate'] = taskDate;
                }
                //console.log(where);
                if (req.role === 'employee') {
                    where.employee = req.userId;
                }
                const task = yield models_1.Task.find(where)
                    .populate('category')
                    .populate('store')
                    .populate('subCategory')
                    .populate('employee').skip(skip).limit(limit2);
                const total = yield models_1.Task.countDocuments(where);
                return this.response({ code: 200, message: 'Task status', data: task, total });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: [] });
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield models_1.Task.findById(id).populate('employee');
                return task
                    ? this.response({ code: 200, message: 'Task status', data: task })
                    : this.response({ code: 400, message: 'Task status not found', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    update(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield models_1.Task.findByIdAndUpdate(id, data, { new: true });
                return this.response({ code: 200, message: 'Task updated successfully', data: task });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield models_1.Task.findByIdAndDelete(id);
                return task
                    ? this.response({ code: 200, message: 'Task status', data: task })
                    : this.response({ code: 400, message: 'Task status not found', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    getTodayCount(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDate = this.formatDate(new Date());
                let where = { taskDate: newDate };
                if (req.role === 'manager') {
                    where.store = req.storeId;
                }
                if (req.role === 'employee') {
                    where.employee = req.userId;
                }
                console.log('where', where);
                const pendingTask = yield models_1.Task.count(Object.assign(Object.assign({}, where), { status: 'pending' }));
                const completeTask = yield models_1.Task.count(Object.assign(Object.assign({}, where), { status: 'complete' }));
                const notNowTask = yield models_1.Task.count(Object.assign(Object.assign({}, where), { status: 'not_now' }));
                const assinedToOtherTask = yield models_1.Task.count(Object.assign(Object.assign({}, where), { status: 'assined_to_other' }));
                return this.response({ code: 200, message: 'get Task count!', data: { pendingTask, completeTask, notNowTask, assinedToOtherTask } });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
}
exports.default = new TaskService();
