import express from "express";
import { StoreController } from "../controllers";
import { checkAuth } from "../middleware";

const storeRoute = express.Router();

storeRoute.post('/', [checkAuth], StoreController.create);
storeRoute.get('/', [checkAuth], StoreController.getAll);
storeRoute.get('/:id', [checkAuth], StoreController.getOne);
storeRoute.put('/:id', [checkAuth], StoreController.update);
storeRoute.delete('/:id', [checkAuth], StoreController.delete);

export default storeRoute;