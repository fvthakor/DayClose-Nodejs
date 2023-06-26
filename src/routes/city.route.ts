import express from "express";
import { CityController } from "../controllers";
import { checkAuth } from "../middleware";

const cityRoute = express.Router();

cityRoute.post('/', [checkAuth], CityController.create);
cityRoute.get('/', [checkAuth], CityController.getAll);
cityRoute.get('/all', [checkAuth], CityController.getAllData);
cityRoute.get('/:id', [checkAuth], CityController.getOne);
cityRoute.put('/:id', [checkAuth], CityController.update);
cityRoute.delete('/:id', [checkAuth], CityController.delete);

export default cityRoute;