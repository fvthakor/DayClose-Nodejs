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
const taskStatus_model_1 = __importDefault(require("../models/taskStatus.model"));
const Service_1 = __importDefault(require("./Service"));
class TaskStatusService extends Service_1.default {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskStatus = yield taskStatus_model_1.default.create(data);
                return this.response({ code: 201, message: 'Taskstatus created successfully', data: taskStatus });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: [] });
            }
        });
    }
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, limit, query } = req.query;
                console.log(page);
                console.log(limit);
                let skip = page && typeof page === 'string' ? Number(page) : 1;
                const limit2 = limit && typeof limit === 'string' ? Number(limit) : 10;
                skip = (skip - 1) * limit2;
                let where = {};
                if (typeof query === 'string' && query.trim() !== '') {
                    where['$or'] = [
                        { "status": { $regex: new RegExp(query, "ig") } },
                    ];
                }
                const taskStatus = yield taskStatus_model_1.default.find(where).skip(skip).limit(limit2);
                const total = yield taskStatus_model_1.default.countDocuments(where);
                return this.response({ code: 200, message: 'Task status', data: taskStatus, total });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: [] });
            }
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskStatus = yield taskStatus_model_1.default.find();
                return this.response({ code: 200, message: 'Task status list', data: taskStatus });
            }
            catch (err) {
                return this.response({ code: 500, message: err.message, data: null });
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskStatus = yield taskStatus_model_1.default.findById(id);
                return taskStatus
                    ? this.response({ code: 200, message: 'Task status', data: taskStatus })
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
                const taskStatus = yield taskStatus_model_1.default.findByIdAndUpdate(id, data, { new: true });
                return this.response({ code: 200, message: 'Task updated successfully', data: taskStatus });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskStatus = yield taskStatus_model_1.default.findByIdAndRemove(id);
                return taskStatus
                    ? this.response({ code: 200, message: 'Task status', data: taskStatus })
                    : this.response({ code: 400, message: 'Task status not found', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
}
exports.default = new TaskStatusService();
