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
class TaskProgressController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const files = req.files;
            let body = req.body;
            console.log('files', files);
            if (files['image1']) {
                body.image1 = files['image1'][0].path.replace(/\\/g, "/");
            }
            if (files['image2']) {
                body.image2 = files['image2'][0].path.replace(/\\/g, "/");
            }
            const response = yield services_1.TaskProgressService.create(Object.assign(Object.assign({}, body), { store: req.storeId, user: req.userId }));
            return res.status(response.code).json(response);
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.TaskProgressService.getAll(req);
            return res.status(response.code).json(response);
        });
        this.taskStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.TaskProgressService.taskStatus(req);
            return res.status(response.code).json(response);
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.TaskProgressService.getOne(req.params.id);
            return res.status(response.code).json(response);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const files = req.files;
            let body = req.body;
            console.log('files', files);
            if (files['image1']) {
                body.image1 = files['image1'][0].path.replace(/\\/g, "/");
            }
            if (files['image2']) {
                body.image2 = files['image2'][0].path.replace(/\\/g, "/");
            }
            const response = yield services_1.TaskProgressService.update(req.params.id, body);
            return res.status(response.code).json(response);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.TaskProgressService.delete(req.params.id);
            return res.status(response.code).json(response);
        });
    }
}
exports.default = new TaskProgressController();
