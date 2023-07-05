import express from 'express';
import { TaskController } from '../controllers';
import { checkAuth } from '../middleware';

const taskRoute = express.Router();

taskRoute.post('/', [checkAuth(['manager'])], TaskController.create);
taskRoute.get('/', [checkAuth(['manager'])], TaskController.getAll);
taskRoute.get('/:id', [checkAuth(['manager'])], TaskController.getOne);
taskRoute.put('/:id', [checkAuth(['manager'])], TaskController.update);
taskRoute.delete('/:id', [checkAuth(['manager'])], TaskController.delete);

export default taskRoute;