import express from "express";
import { DocumentTypeController } from "../controllers";
import { checkAuth } from "../middleware";

const documentTypeRoute = express.Router();

documentTypeRoute.post('/', [checkAuth(['admin'])], DocumentTypeController.create);
documentTypeRoute.get('/', [checkAuth(['admin'])], DocumentTypeController.getAll);
documentTypeRoute.get('/all', DocumentTypeController.getAllData);
documentTypeRoute.get('/:id', [checkAuth(['admin'])], DocumentTypeController.getOne);
documentTypeRoute.put('/:id', [checkAuth(['admin'])], DocumentTypeController.update);
documentTypeRoute.delete('/:id', [checkAuth(['admin'])], DocumentTypeController.delete);

export default documentTypeRoute;