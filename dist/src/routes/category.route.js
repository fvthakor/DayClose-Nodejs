"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const categoryRoute = express_1.default.Router();
categoryRoute.post('/', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.CategoryController.create);
categoryRoute.get('/', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.CategoryController.getAll);
categoryRoute.get('/all', controllers_1.CategoryController.getAllData);
categoryRoute.get('/parent', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.CategoryController.getMainCategory);
categoryRoute.get('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.CategoryController.getOne);
categoryRoute.put('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.CategoryController.update);
categoryRoute.delete('/:id', [(0, middleware_1.checkAuth)(['manager'])], controllers_1.CategoryController.delete);
exports.default = categoryRoute;
