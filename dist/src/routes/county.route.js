"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const countyRoute = express_1.default.Router();
countyRoute.post('/', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.CountyController.create);
countyRoute.get('/', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.CountyController.getAll);
countyRoute.get('/all', controllers_1.CountyController.getAllData);
countyRoute.get('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.CountyController.getOne);
countyRoute.put('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.CountyController.update);
countyRoute.delete('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.CountyController.delete);
exports.default = countyRoute;
