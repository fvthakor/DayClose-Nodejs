import express from "express";
import { AuthController } from "../controllers";

import uploadAll from "../middleware/UploadAllMiddleware";
import { checkAuth } from "../middleware/AuthMiddleware";

const authRoute = express.Router();

const cpUpload = uploadAll.fields(
    [{name:'documentFront', maxCount: 1}, {name:'documentBack', maxCount: 1}, {name:'employeePhoto', maxCount: 1}, {name:'document1', maxCount: 1}, {name:'document2', maxCount: 1} ]
);

authRoute.post('/register', [checkAuth(['admin', 'manager']),cpUpload] , AuthController.register);
authRoute.post('/login', AuthController.login);
authRoute.get('/me', [checkAuth(['admin', 'manager', 'employee'])], AuthController.me);

export default authRoute;  
