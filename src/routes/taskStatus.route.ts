import express from 'express';
import { TaskStatusController } from '../controllers';
import { checkAuth } from '../middleware';

const taskStatusRoute = express.Router();

taskStatusRoute.post('/', [checkAuth(['manager'])], TaskStatusController.create);
taskStatusRoute.get('/all', [checkAuth(['manager', 'employee'])], TaskStatusController.all);
taskStatusRoute.get('/', [checkAuth(['manager'])], TaskStatusController.getAll);
taskStatusRoute.get('/:id', [checkAuth(['manager'])], TaskStatusController.getOne);
taskStatusRoute.put('/:id', [checkAuth(['manager'])], TaskStatusController.update);
taskStatusRoute.delete('/:id', [checkAuth(['manager'])], TaskStatusController.delete);
export default taskStatusRoute;