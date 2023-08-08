"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const UploadAllMiddleware_1 = __importDefault(require("../middleware/UploadAllMiddleware"));
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const authRoute = express_1.default.Router();
const cpUpload = UploadAllMiddleware_1.default.fields([{ name: 'documentFront', maxCount: 1 }, { name: 'documentBack', maxCount: 1 }, { name: 'employeePhoto', maxCount: 1 }, { name: 'document1', maxCount: 1 }, { name: 'document2', maxCount: 1 }]);
authRoute.post('/register', [(0, AuthMiddleware_1.checkAuth)(['admin', 'manager']), cpUpload], controllers_1.AuthController.register);
authRoute.post('/login', controllers_1.AuthController.login);
authRoute.get('/me', [(0, AuthMiddleware_1.checkAuth)(['admin', 'manager', 'employee'])], controllers_1.AuthController.me);
exports.default = authRoute;
