"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const taskStatusRoute = express_1.default.Router();
taskStatusRoute.post('/', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskStatusController.create);
taskStatusRoute.get('/all', [(0, middleware_1.checkAuth)(['manager', 'employee'])], controllers_1.TaskStatusController.all);
taskStatusRoute.get('/', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskStatusController.getAll);
taskStatusRoute.get('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskStatusController.getOne);
taskStatusRoute.put('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskStatusController.update);
taskStatusRoute.delete('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskStatusController.delete);
exports.default = taskStatusRoute;
