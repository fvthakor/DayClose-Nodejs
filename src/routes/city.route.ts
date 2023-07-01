import express from "express";
import { CityController } from "../controllers";
import { checkAuth } from "../middleware";

const cityRoute = express.Router();

cityRoute.post('/', [checkAuth(['admin'])], CityController.create);
cityRoute.get('/', [checkAuth(['admin'])], CityController.getAll);
cityRoute.get('/all', CityController.getAllData);
cityRoute.get('/:id', [checkAuth(['admin'])], CityController.getOne);
cityRoute.put('/:id', [checkAuth(['admin'])], CityController.update);
cityRoute.delete('/:id', [checkAuth(['admin'])], CityController.delete);

export default cityRoute;