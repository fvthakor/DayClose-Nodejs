import { Request, Response } from "express";
import { TaskProgressService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";
import { TaskProgressModel } from "../interfaces";

class TaskProgressController {
    constructor() {

    }
    create = async (req: RequestCustom, res: Response) => {
        const files: any = req.files;
        let body: TaskProgressModel = req.body;
        console.log('files', files);
        if (files['image1']) {
            body.image1 = files['image1'][0].path.replace(/\\/g, "/");
        }
        if (files['image2']) {
            body.image2 = files['image2'][0].path.replace(/\\/g, "/");
        }
        const response = await TaskProgressService.create({...body, store: req.storeId, user: req.userId});
        return res.status(response.code).json(response);
    }
    getAll = async (req: Request, res: Response) => {
        const response = await TaskProgressService.getAll(req);
        return res.status(response.code).json(response);
    }
    taskStatus = async (req: Request, res: Response) => {
        const response = await TaskProgressService.taskStatus(req);
        return res.status(response.code).json(response);
    }
    getOne = async (req: Request, res: Response) => {
        const response = await TaskProgressService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }
    update = async (req: Request, res: Response) => {
        const files: any = req.files;
        let body: TaskProgressModel = req.body;
        console.log('files', files);
        if (files['image1']) {
            body.image1 = files['image1'][0].path.replace(/\\/g, "/");
        }
        if (files['image2']) {
            body.image2 = files['image2'][0].path.replace(/\\/g, "/");
        }
        const response = await TaskProgressService.update(req.params.id, body);
        return res.status(response.code).json(response);
    }
    delete = async (req: Request, res: Response) => {
        const response = await TaskProgressService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
}
export default new TaskProgressController();