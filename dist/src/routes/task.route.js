"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const taskRoute = express_1.default.Router();
taskRoute.post('/', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskController.create);
taskRoute.get('/', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskController.getAll);
taskRoute.get('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskController.getOne);
taskRoute.put('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskController.update);
taskRoute.delete('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskController.delete);
exports.default = taskRoute;