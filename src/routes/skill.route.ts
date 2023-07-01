import express from "express";
import { SkillController } from "../controllers";
import { checkAuth } from "../middleware";

const skillRoute = express.Router();

skillRoute.post('/', [checkAuth(['admin'])], SkillController.create);
skillRoute.get('/', [checkAuth(['admin'])], SkillController.getAll);
skillRoute.get('/all', SkillController.getAllData);
skillRoute.get('/:id', [checkAuth(['admin'])], SkillController.getOne);
skillRoute.put('/:id', [checkAuth(['admin'])], SkillController.update);
skillRoute.delete('/:id', [checkAuth(['admin'])], SkillController.delete);

export default skillRoute;