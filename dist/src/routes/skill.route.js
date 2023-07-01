"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const skillRoute = express_1.default.Router();
skillRoute.post('/', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.SkillController.create);
skillRoute.get('/', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.SkillController.getAll);
skillRoute.get('/all', controllers_1.SkillController.getAllData);
skillRoute.get('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.SkillController.getOne);
skillRoute.put('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.SkillController.update);
skillRoute.delete('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.SkillController.delete);
exports.default = skillRoute;
