"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const taskProgress = express_1.default.Router();
taskProgress.post('/', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskProgressController.create);
taskProgress.get('/', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskProgressController.getAll);
taskProgress.get('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskProgressController.getOne);
taskProgress.put('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskProgressController.update);
taskProgress.delete('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskProgressController.delete);
exports.default = taskProgress;
