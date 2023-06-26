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
class PincodeService extends Service_1.default {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pincode = yield models_1.Pincode.create(data);
                return this.response({ code: 201, message: 'Pincode added successfully!', data: pincode });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pincode = yield models_1.Pincode.findById(id).populate('city');
                return pincode
                    ? this.response({ code: 200, message: 'Pincode by id!', data: pincode })
                    : this.response({ code: 400, message: 'Pincode not found!', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pincode = yield models_1.Pincode.findByIdAndUpdate(id, data, { new: true });
                return pincode
                    ? this.response({ code: 200, message: 'Pincode updated successfully!', data: pincode })
                    : this.response({ code: 400, message: 'Pincode not found!', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
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
                let where = {};
                if (typeof query === 'string' && query.trim() !== '') {
                    where['$or'] = [
                        { "pincode": { $regex: new RegExp(query, "ig") } },
                    ];
                }
                const pincodes = yield models_1.Pincode.find(where).skip(skip).limit(limit2).populate('city');
                const total = yield models_1.Pincode.countDocuments(where);
                return this.response({ code: 200, message: 'All Pincodes', data: pincodes, total });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: [] });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pincode = yield models_1.Pincode.findByIdAndDelete(id);
                return pincode
                    ? this.response({ code: 200, message: 'Pincode deleted successfully!', data: pincode })
                    : this.response({ code: 400, message: 'Pincode not found!', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
}
exports.default = new PincodeService();
