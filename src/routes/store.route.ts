import express from "express";
import { StoreController } from "../controllers";
import { checkAuth } from "../middleware";

const storeRoute = express.Router();

storeRoute.post('/', [checkAuth(['admin'])], StoreController.create);
storeRoute.get('/', [checkAuth(['admin'])], StoreController.getAll);
storeRoute.get('/all', StoreController.getAllData);
storeRoute.get('/:id', [checkAuth(['admin'])], StoreController.getOne);
storeRoute.put('/:id', [checkAuth(['admin'])], StoreController.update);
storeRoute.delete('/:id', [checkAuth(['admin'])], StoreController.delete);

export default storeRoute;