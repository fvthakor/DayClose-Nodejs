"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("./user.route"));
const store_route_1 = __importDefault(require("./store.route"));
const documentType_route_1 = __importDefault(require("./documentType.route"));
const restRouter = express_1.default.Router();
exports.restRouter = restRouter;
restRouter.use('/auth', auth_route_1.default);
restRouter.use('/user', user_route_1.default);
restRouter.use('/store', store_route_1.default);
restRouter.use('/document-type', documentType_route_1.default);
