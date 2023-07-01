import express from "express";
import { CategoryController, CityController } from "../controllers";
import { checkAuth } from "../middleware";

const categoryRoute = express.Router();

categoryRoute.post('/', [checkAuth(['manager'])], CategoryController.create);
categoryRoute.get('/', [checkAuth(['manager'])], CategoryController.getAll);
categoryRoute.get('/all', CategoryController.getAllData);
categoryRoute.get('/:id', [checkAuth(['manager'])], CategoryController.getOne);
categoryRoute.put('/:id', [checkAuth(['manager'])], CategoryController.update);
categoryRoute.delete('/:id', [checkAuth(['manager'])], CategoryController.delete);

export default categoryRoute;