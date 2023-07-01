"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const storeRoute = express_1.default.Router();
storeRoute.post('/', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.StoreController.create);
storeRoute.get('/', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.StoreController.getAll);
storeRoute.get('/all', controllers_1.StoreController.getAllData);
storeRoute.get('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.StoreController.getOne);
storeRoute.put('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.StoreController.update);
storeRoute.delete('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.StoreController.delete);
exports.default = storeRoute;
