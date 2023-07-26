import express from "express";
import { UserController } from "../controllers";
import { checkAuth } from "../middleware";

const userRoute = express.Router();

userRoute.post('/', UserController.create);
userRoute.get('/', checkAuth(['admin','manager']), UserController.getAll);
userRoute.get('/employee',checkAuth(['manager']), UserController.getEmployee);
userRoute.get('/:id', UserController.getOne);
userRoute.put('/:id', UserController.update);
userRoute.delete('/:id', UserController.delete);

export default userRoute;