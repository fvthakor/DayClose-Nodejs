"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const Service_1 = __importDefault(require("./Service"));
class UserService extends Service_1.default {
    constructor() {
        super(...arguments);
        this.getEmployee = (storeId) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('storeId', storeId);
                const users = yield models_1.User.find({
                    store: storeId,
                    role: 'employee'
                });
                return this.response({ code: 200, message: 'All Store employee', data: users });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: [] });
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = yield bcrypt.hash(data.password, process.env.PASSWORD_SALT ? +process.env.PASSWORD_SALT : 10);
                const user = yield models_1.User.create(Object.assign(Object.assign({}, data), { password: hash }));
                return this.response({ code: 201, message: 'User added successfully!', data: user });
            }
            catch (error) {
                console.log(error);
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findById(id);
                return user
                    ? this.response({ code: 200, message: 'User by id!', data: user })
                    : this.response({ code: 400, message: 'User not found!', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findByIdAndUpdate(id, data, { new: true });
                if (user) {
                    return this.response({ code: 200, message: 'User updated successfully!', data: user });
                }
                else {
                    return this.response({ code: 400, message: 'User not found!', data: null });
                }
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, limit, query } = req.query;
                let skip = page && typeof page === 'string' ? Number(page) : 1;
                const limit2 = limit && typeof limit === 'string' ? Number(limit) : 10;
                skip = (skip - 1) * limit2;
                console.log('req.role', req.role);
                let where = {
                    role: req.role === 'admin' ? 'manager' : 'employee'
                };
                if (req.role === 'manager') {
                    where.store = req.storeId;
                }
                if (typeof query === 'string' && query.trim() !== '') {
                    where['$or'] = [
                        { "firstName": { $regex: new RegExp(query, "ig") } },
                        { "lastName": { $regex: new RegExp(query, "ig") } },
                        { "address": { $regex: new RegExp(query, "ig") } },
                        { "email": { $regex: new RegExp(query, "ig") } },
                        //{ "pincode": { $regex: new RegExp(query, "ig") } },
                    ];
                }
                const users = yield models_1.User.find(where).skip(skip).limit(limit2);
                const total = yield models_1.User.countDocuments(where);
                return this.response({ code: 200, message: 'All Users', data: users, total });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: [] });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findByIdAndDelete(id);
                if (user) {
                    return this.response({ code: 200, message: 'User deleted successfully!', data: user });
                }
                else {
                    return this.response({ code: 400, message: 'User not found!', data: null });
                }
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
}
exports.default = new UserService();
