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
class CategoryService extends Service_1.default {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield models_1.Category.create(Object.assign(Object.assign({}, data), { mainCategory: data.mainCategory ? data.mainCategory : null }));
                return this.response({ code: 201, message: 'Category added successfully!', data: category });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield models_1.Category.findById(id);
                return category
                    ? this.response({ code: 200, message: 'Category by id!', data: category })
                    : this.response({ code: 400, message: 'Category not found!', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield models_1.Category.findByIdAndUpdate(id, data, { new: true });
                return category
                    ? this.response({ code: 200, message: 'Category updated successfully!', data: category })
                    : this.response({ code: 400, message: 'Category not found!', data: null });
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
                        { "category": { $regex: new RegExp(query, "ig") } },
                    ];
                }
                const catigories = yield models_1.Category.find(where).skip(skip).limit(limit2).populate('mainCategory');
                const total = yield models_1.Category.countDocuments(where);
                return this.response({ code: 200, message: 'All Cateory', data: catigories, total });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: [] });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield models_1.Category.findByIdAndDelete(id);
                return category
                    ? this.response({ code: 200, message: 'Category deleted successfully!', data: category })
                    : this.response({ code: 400, message: 'Category not found!', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
    getAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield models_1.Category.find().populate('pincodes');
                return this.response({ code: 200, message: 'All Categories', data: categories });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: [] });
            }
        });
    }
    getMainCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var where = { mainCategory: null };
                const categories = yield models_1.Category.find(where);
                return this.response({ code: 200, message: 'Parent Categories', data: categories });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: [] });
            }
        });
    }
}
exports.default = new CategoryService();
