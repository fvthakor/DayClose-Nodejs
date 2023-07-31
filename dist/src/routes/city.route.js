"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const cityRoute = express_1.default.Router();
cityRoute.post('/', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.CityController.create);
cityRoute.get('/', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.CityController.getAll);
cityRoute.get('/all', controllers_1.CityController.getAllData);
cityRoute.get('/county-wise', controllers_1.CityController.getCountyCity);
cityRoute.get('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.CityController.getOne);
cityRoute.put('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.CityController.update);
cityRoute.delete('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.CityController.delete);
exports.default = cityRoute;
