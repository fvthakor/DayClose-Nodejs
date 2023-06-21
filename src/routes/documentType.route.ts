import express from "express";
import { DocumentTypeController } from "../controllers";
import { checkAuth } from "../middleware";

const documentTypeRoute = express.Router();

documentTypeRoute.post('/', [checkAuth], DocumentTypeController.create);
documentTypeRoute.get('/', [checkAuth], DocumentTypeController.getAll);
documentTypeRoute.get('/:id', [checkAuth], DocumentTypeController.getOne);
documentTypeRoute.put('/:id', [checkAuth], DocumentTypeController.update);
documentTypeRoute.delete('/:id', [checkAuth], DocumentTypeController.delete);

export default documentTypeRoute;