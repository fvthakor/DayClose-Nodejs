"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillController = exports.DocumentTypeController = exports.StoreController = exports.UserController = exports.AuthController = void 0;
const auth_controller_1 = __importDefault(require("./auth.controller"));
exports.AuthController = auth_controller_1.default;
const User_controller_1 = __importDefault(require("./User.controller"));
exports.UserController = User_controller_1.default;
const StoreController_1 = __importDefault(require("./StoreController"));
exports.StoreController = StoreController_1.default;
const DocumentTypeController_1 = __importDefault(require("./DocumentTypeController"));
exports.DocumentTypeController = DocumentTypeController_1.default;
const SkillController_1 = __importDefault(require("./SkillController"));
exports.SkillController = SkillController_1.default;
