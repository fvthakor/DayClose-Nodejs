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
const skill_route_1 = __importDefault(require("./skill.route"));
const city_route_1 = __importDefault(require("./city.route"));
const pincode_route_1 = __importDefault(require("./pincode.route"));
const category_route_1 = __importDefault(require("./category.route"));
const taskStatus_route_1 = __importDefault(require("./taskStatus.route"));
const restRouter = express_1.default.Router();
exports.restRouter = restRouter;
restRouter.use('/auth', auth_route_1.default);
restRouter.use('/user', user_route_1.default);
restRouter.use('/store', store_route_1.default);
restRouter.use('/document-type', documentType_route_1.default);
restRouter.use('/skill', skill_route_1.default);
restRouter.use('/city', city_route_1.default);
restRouter.use('/pincode', pincode_route_1.default);
restRouter.use('/category', category_route_1.default);
restRouter.use('/task-status', taskStatus_route_1.default);
