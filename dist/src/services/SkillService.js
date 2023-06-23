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
class SkillService extends Service_1.default {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skill = yield models_1.Skill.create(data);
                return this.response({ code: 201, message: 'Skill added successfully!', data: skill });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skill = yield models_1.Skill.findById(id);
                return skill
                    ? this.response({ code: 200, message: 'Skill by id!', data: skill })
                    : this.response({ code: 400, message: 'Skill not found!', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skill = yield models_1.Skill.findByIdAndUpdate(id, data, { new: true });
                return skill
                    ? this.response({ code: 200, message: 'Skill updated successfully!', data: skill })
                    : this.response({ code: 400, message: 'Skill not found!', data: null });
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
                        { "name": { $regex: new RegExp(query, "ig") } },
                    ];
                }
                const skills = yield models_1.Skill.find(where).skip(skip).limit(limit2);
                const total = yield models_1.Skill.countDocuments(where);
                return this.response({ code: 200, message: 'All Skill', data: skills, total });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: [] });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skill = yield models_1.Skill.findByIdAndDelete(id);
                return skill
                    ? this.response({ code: 200, message: 'Skill deleted successfully!', data: skill })
                    : this.response({ code: 400, message: 'Skill not found!', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
}
exports.default = new SkillService();
