"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const UploadMiddleware_1 = __importDefault(require("../middleware/UploadMiddleware"));
const taskRoute = express_1.default.Router();
const cpUpload = UploadMiddleware_1.default.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]);
taskRoute.post('/', [(0, middleware_1.checkAuth)(['manager']), cpUpload], controllers_1.TaskController.create);
taskRoute.get('/', [(0, middleware_1.checkAuth)(['manager', 'employee'])], controllers_1.TaskController.getAll);
taskRoute.get('/task-count', [(0, middleware_1.checkAuth)(['manager', 'employee', 'admin'])], controllers_1.TaskController.getTodayCount);
taskRoute.get('/:id', [(0, middleware_1.checkAuth)(['manager', 'employee'])], controllers_1.TaskController.getOne);
taskRoute.put('/:id', [(0, middleware_1.checkAuth)(['manager']), cpUpload], controllers_1.TaskController.update);
taskRoute.delete('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskController.delete);
exports.default = taskRoute;
