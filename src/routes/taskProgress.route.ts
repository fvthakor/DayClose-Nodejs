import express from "express";
import { TaskProgressController } from "../controllers";
import { checkAuth } from "../middleware";

const taskProgress = express.Router();

taskProgress.post('/', [checkAuth(['manager'])], TaskProgressController.create);
taskProgress.get('/', [checkAuth(['manager'])], TaskProgressController.getAll);
taskProgress.get('/taskstatus/:id', [checkAuth(['manager'])], TaskProgressController.taskStatus);
taskProgress.get('/:id', [checkAuth(['manager'])], TaskProgressController.getOne);
taskProgress.put('/:id', [checkAuth(['manager'])], TaskProgressController.update);
taskProgress.delete('/:id', [checkAuth(['manager'])], TaskProgressController.delete);
export default taskProgress;