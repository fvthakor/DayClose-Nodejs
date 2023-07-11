import express from "express";
import { TaskProgressController } from "../controllers";
import { checkAuth } from "../middleware";
import uploadFile from "../middleware/UploadMiddleware";

const taskProgress = express.Router();

const cpUpload = uploadFile.fields(
    [{name:'image1', maxCount: 1}, {name:'image2', maxCount: 1}]
);

taskProgress.post('/', [checkAuth(['manager', 'employee']), cpUpload], TaskProgressController.create);
taskProgress.get('/', [checkAuth(['manager', 'employee'])], TaskProgressController.getAll);
taskProgress.get('/taskstatus/:id', [checkAuth(['manager', 'employee'])], TaskProgressController.taskStatus);
taskProgress.get('/:id', [checkAuth(['manager'])], TaskProgressController.getOne);
taskProgress.put('/:id', [checkAuth(['manager', 'employee']), cpUpload], TaskProgressController.update);
taskProgress.delete('/:id', [checkAuth(['manager', 'employee'])], TaskProgressController.delete);
export default taskProgress;