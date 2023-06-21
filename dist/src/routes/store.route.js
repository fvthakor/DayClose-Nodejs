"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const storeRoute = express_1.default.Router();
storeRoute.post('/', [middleware_1.checkAuth], controllers_1.StoreController.create);
storeRoute.get('/', [middleware_1.checkAuth], controllers_1.StoreController.getAll);
storeRoute.get('/:id', [middleware_1.checkAuth], controllers_1.StoreController.getOne);
storeRoute.put('/:id', [middleware_1.checkAuth], controllers_1.StoreController.update);
storeRoute.delete('/:id', [middleware_1.checkAuth], controllers_1.StoreController.delete);
exports.default = storeRoute;
