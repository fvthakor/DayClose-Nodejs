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
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.AuthService.login(req.body, res);
            return res.status(response.code).json(response);
        });
        this.me = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.AuthService.me(req.userId ? req.userId : '');
            return res.status(200).json(response);
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const files = req.files;
            let body = req.body;
            if (files && files['documentFront']) {
                body.documentFront = files['documentFront'][0].path.replace(/\\/g, "/");
            }
            if (files && files['documentBack']) {
                body.documentBack = files['documentBack'][0].path.replace(/\\/g, "/");
            }
            if (files && files['employeePhoto']) {
                body.employeePhoto = files['employeePhoto'][0].path.replace(/\\/g, "/");
            }
            if (files && files['document1']) {
                body.document1 = files['document1'][0].path.replace(/\\/g, "/");
            }
            if (files && files['document2']) {
                body.document2 = files['document2'][0].path.replace(/\\/g, "/");
            }
            body.role = req.role === 'admin' ? 'manager' : 'employee';
            const response = yield services_1.AuthService.register(body);
            return res.status(response.code).json(response);
        });
    }
}
exports.default = new AuthController();
