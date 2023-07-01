import express from "express";
import { PincodeController } from "../controllers";
import { checkAuth } from "../middleware";

const pincodeRoute = express.Router();

pincodeRoute.post('/', [checkAuth(['admin'])], PincodeController.create);
pincodeRoute.get('/', [checkAuth(['admin'])], PincodeController.getAll);
pincodeRoute.get('/all', PincodeController.getAllData);
pincodeRoute.get('/:id', [checkAuth(['admin'])], PincodeController.getOne);
pincodeRoute.put('/:id', [checkAuth(['admin'])], PincodeController.update);
pincodeRoute.delete('/:id', [checkAuth(['admin'])], PincodeController.delete);

export default pincodeRoute;