import express from "express";
import { SkillController } from "../controllers";
import { checkAuth } from "../middleware";

const skillRoute = express.Router();

skillRoute.post('/', [checkAuth], SkillController.create);
skillRoute.get('/', [checkAuth], SkillController.getAll);
skillRoute.get('/:id', [checkAuth], SkillController.getOne);
skillRoute.put('/:id', [checkAuth], SkillController.update);
skillRoute.delete('/:id', [checkAuth], SkillController.delete);

export default skillRoute;