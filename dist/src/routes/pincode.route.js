"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const pincodeRoute = express_1.default.Router();
pincodeRoute.post('/', [middleware_1.checkAuth], controllers_1.PincodeController.create);
pincodeRoute.get('/', [middleware_1.checkAuth], controllers_1.PincodeController.getAll);
pincodeRoute.get('/:id', [middleware_1.checkAuth], controllers_1.PincodeController.getOne);
pincodeRoute.put('/:id', [middleware_1.checkAuth], controllers_1.PincodeController.update);
pincodeRoute.delete('/:id', [middleware_1.checkAuth], controllers_1.PincodeController.delete);
exports.default = pincodeRoute;
