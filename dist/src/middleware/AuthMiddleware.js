"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.checkAuth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const checkAuth = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers["authorization"];
            let token;
            if (!authHeader) {
                token = req.cookies.authToken;
                if (!token) {
                    return res.status(401).json({ code: 401, message: 'Please provide auth token!', data: null });
                }
            }
            else {
                const bareerToken = authHeader.split(' ');
                token = authHeader && bareerToken.length > 1 ? authHeader.split(' ')[1] : null;
            }
            if (token) {
                const accessToken = process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 'dayClose';
                const decoded = yield jwt.verify(token, accessToken);
                if (decoded) {
                    if (typeof decoded !== 'string') {
                        if (roles.includes(decoded.role)) {
                            req.userId = decoded._id;
                            req.storeId = decoded.store;
                            req.role = decoded.role;
                            return next();
                        }
                        else {
                            return res.status(400).json({
                                code: 400,
                                message: 'Unauthorize access!',
                                data: null
                            });
                        }
                        //return next();
                    }
                    else {
                        return res.status(401).json({
                            code: 401,
                            message: 'Unauthorize access!',
                            data: null
                        });
                    }
                }
                else {
                    return res.status(401).json({
                        code: 401,
                        message: 'Unauthorize access!',
                        data: null
                    });
                }
            }
            else {
                return res.status(401).json({
                    code: 401,
                    message: 'Unauthorize access!',
                    data: null
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                code: 500,
                message: 'Request failed due to an internal error!',
                data: null
            });
        }
    });
};
exports.checkAuth = checkAuth;
