import express from "express";
import { CountyController } from "../controllers";
import { checkAuth } from "../middleware";

const countyRoute = express.Router();

countyRoute.post('/', [checkAuth(['admin'])], CountyController.create);
countyRoute.get('/', [checkAuth(['admin'])], CountyController.getAll);
countyRoute.get('/all', CountyController.getAllData);
countyRoute.get('/:id', [checkAuth(['admin'])], CountyController.getOne);
countyRoute.put('/:id', [checkAuth(['admin'])], CountyController.update);
countyRoute.delete('/:id', [checkAuth(['admin'])], CountyController.delete);

export default countyRoute;