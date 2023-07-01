import express from "express";
import { AuthController } from "../controllers";

import uploadFile from "../middleware/UploadMiddleware";
import { checkAuth } from "../middleware/AuthMiddleware";

const authRoute = express.Router();

const cpUpload = uploadFile.fields([
    { name: 'documentFront', maxCount: 1 },
    { name: 'documentBack', maxCount: 1 },
    { name: 'employeePhoto', maxCount: 1 }
]);

authRoute.post('/register', cpUpload, AuthController.register);
authRoute.post('/login', AuthController.login)
authRoute.get('/me', [checkAuth(['admin', 'manager', 'employee'])], AuthController.me)
export default authRoute;
