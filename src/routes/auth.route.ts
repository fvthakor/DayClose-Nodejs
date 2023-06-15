import express from "express";
import { AuthController } from "../controllers";
import { checkAuth } from "../middleware";

const authRoute = express.Router();

authRoute.post('/register', AuthController.register)
authRoute.post('/login', AuthController.login)
authRoute.get('/me', [checkAuth], AuthController.me)
export default authRoute;
