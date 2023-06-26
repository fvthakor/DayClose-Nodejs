import express from "express";
import { PincodeController } from "../controllers";
import { checkAuth } from "../middleware";

const pincodeRoute = express.Router();

pincodeRoute.post('/', [checkAuth], PincodeController.create);
pincodeRoute.get('/', [checkAuth], PincodeController.getAll);
pincodeRoute.get('/:id', [checkAuth], PincodeController.getOne);
pincodeRoute.put('/:id', [checkAuth], PincodeController.update);
pincodeRoute.delete('/:id', [checkAuth], PincodeController.delete);

export default pincodeRoute;