"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.Category = exports.Pincode = exports.City = exports.Skill = exports.DocumentType = exports.Store = exports.User = void 0;
const user_model_1 = __importDefault(require("./user.model"));
exports.User = user_model_1.default;
const store_model_1 = __importDefault(require("./store.model"));
exports.Store = store_model_1.default;
const documentType_1 = __importDefault(require("./documentType"));
exports.DocumentType = documentType_1.default;
const skill_model_1 = __importDefault(require("./skill.model"));
exports.Skill = skill_model_1.default;
const city_model_1 = __importDefault(require("./city.model"));
exports.City = city_model_1.default;
const pincode_model_1 = __importDefault(require("./pincode.model"));
exports.Pincode = pincode_model_1.default;
const category_model_1 = __importDefault(require("./category.model"));
exports.Category = category_model_1.default;
const task_model_1 = __importDefault(require("./task.model"));
exports.Task = task_model_1.default;
