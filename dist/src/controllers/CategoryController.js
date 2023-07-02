"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class CategoryController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.CategoryService.create(Object.assign(Object.assign({}, req.body), { store: req.storeId, user: req.userId }));
            return res.status(response.code).json(response);
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.CategoryService.getOne(req.params.id);
            return res.status(response.code).json(response);
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.CategoryService.getAll(req);
            return res.status(response.code).json(response);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.CategoryService.update(req.params.id, req.body);
            return res.status(response.code).json(response);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.CategoryService.delete(req.params.id);
            return res.status(response.code).json(response);
        });
        this.getAllData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.CategoryService.getAllData();
            return res.status(response.code).json(response);
        });
        this.getMainCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.CategoryService.getMainCategory();
            return res.status(response.code).json(response);
        });
        this.getSubCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.CategoryService.getSubCategory(req.params.id);
            return res.status(response.code).json(response);
        });
    }
}
exports.default = new CategoryController();
