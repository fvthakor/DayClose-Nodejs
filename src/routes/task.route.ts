import express from 'express';
import { TaskController } from '../controllers';
import { checkAuth } from '../middleware';
import uploadFile from '../middleware/UploadMiddleware';

const taskRoute = express.Router();

const cpUpload = uploadFile.fields(
    [{name:'image1', maxCount: 1}, {name:'image2', maxCount: 1}]
);

taskRoute.post('/', [checkAuth(['manager']), cpUpload], TaskController.create);
taskRoute.get('/', [checkAuth(['manager', 'employee'])], TaskController.getAll);
taskRoute.get('/:id', [checkAuth(['manager', 'employee'])], TaskController.getOne);
taskRoute.put('/:id', [checkAuth(['manager']), cpUpload], TaskController.update);
taskRoute.delete('/:id', [checkAuth(['manager'])], TaskController.delete);

export default taskRoute;