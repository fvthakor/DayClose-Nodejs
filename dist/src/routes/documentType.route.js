"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const documentTypeRoute = express_1.default.Router();
documentTypeRoute.post('/', [middleware_1.checkAuth], controllers_1.DocumentTypeController.create);
documentTypeRoute.get('/', [middleware_1.checkAuth], controllers_1.DocumentTypeController.getAll);
documentTypeRoute.get('/:id', [middleware_1.checkAuth], controllers_1.DocumentTypeController.getOne);
documentTypeRoute.put('/:id', [middleware_1.checkAuth], controllers_1.DocumentTypeController.update);
documentTypeRoute.delete('/:id', [middleware_1.checkAuth], controllers_1.DocumentTypeController.delete);
exports.default = documentTypeRoute;
