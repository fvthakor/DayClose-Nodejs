"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const UploadMiddleware_1 = __importDefault(require("../middleware/UploadMiddleware"));
const bannerRoute = express_1.default.Router();
const cpUpload = UploadMiddleware_1.default.fields([{ name: 'banner', maxCount: 1 }]);
bannerRoute.post('/', [(0, middleware_1.checkAuth)(['admin']), cpUpload], controllers_1.BannerController.create);
bannerRoute.get('/', [(0, middleware_1.checkAuth)(['manager', 'manager', 'admin'])], controllers_1.BannerController.getAll);
bannerRoute.get('/all', controllers_1.BannerController.getAllData);
bannerRoute.get('/:id', [(0, middleware_1.checkAuth)(['manager', 'manager', 'admin'])], controllers_1.BannerController.getOne);
bannerRoute.put('/:id', [(0, middleware_1.checkAuth)(['admin']), cpUpload], controllers_1.BannerController.update);
bannerRoute.delete('/:id', [(0, middleware_1.checkAuth)(['admin'])], controllers_1.BannerController.delete);
exports.default = bannerRoute;
