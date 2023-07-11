"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const UploadMiddleware_1 = __importDefault(require("../middleware/UploadMiddleware"));
const taskProgress = express_1.default.Router();
const cpUpload = UploadMiddleware_1.default.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]);
taskProgress.post('/', [(0, middleware_1.checkAuth)(['manager', 'employee']), cpUpload], controllers_1.TaskProgressController.create);
taskProgress.get('/', [(0, middleware_1.checkAuth)(['manager', 'employee'])], controllers_1.TaskProgressController.getAll);
taskProgress.get('/taskstatus/:id', [(0, middleware_1.checkAuth)(['manager', 'employee'])], controllers_1.TaskProgressController.taskStatus);
taskProgress.get('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.TaskProgressController.getOne);
taskProgress.put('/:id', [(0, middleware_1.checkAuth)(['manager', 'employee']), cpUpload], controllers_1.TaskProgressController.update);
taskProgress.delete('/:id', [(0, middleware_1.checkAuth)(['manager', 'employee'])], controllers_1.TaskProgressController.delete);
exports.default = taskProgress;
