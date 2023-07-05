"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const UploadMiddleware_1 = __importDefault(require("../middleware/UploadMiddleware"));
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const authRoute = express_1.default.Router();
const cpUpload = UploadMiddleware_1.default.any();
authRoute.post('/register', cpUpload, controllers_1.AuthController.register);
authRoute.post('/login', controllers_1.AuthController.login);
authRoute.get('/me', [(0, AuthMiddleware_1.checkAuth)(['admin', 'manager', 'employee'])], controllers_1.AuthController.me);
exports.default = authRoute;
