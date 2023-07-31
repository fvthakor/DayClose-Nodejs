import { Request, Response } from "express";
import { TaskService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";
import { TaskModel } from "../interfaces";

class TaskController {
    constructor() {

    }

    getTodayCount = async (req: Request, res: Response) => {
        const response = await TaskService.getTodayCount(req);
        return res.status(response.code).json(response);
    }
    

    create = async (req: RequestCustom, res: Response) => {

        const files: any = req.files;
        let body: TaskModel = req.body;
        console.log('files', files);
        if (files && files['image1']) {
            body.image1 = files['image1'][0].path.replace(/\\/g, "/");
        }
        if (files && files['image2']) {
            body.image2 = files['image2'][0].path.replace(/\\/g, "/");
        }
        const response = await TaskService.create({ ...body, store: req.storeId, user: req.userId });
        return res.status(response.code).json(response);
    }
    getAll = async (req: Request, res: Response) => {

        const response = await TaskService.getAll(req);
        return res.status(response.code).json(response);
    }
    getOne = async (req: Request, res: Response) => {
        const response = await TaskService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }
    update = async (req: Request, res: Response) => {
        const files: any = req.files;
        let body: TaskModel = req.body;
        console.log('files', files);
        if (files['image1']) {
            body.image1 = files['image1'][0].path.replace(/\\/g, "/");
        }
        if (files['image2']) {
            body.image2 = files['image2'][0].path.replace(/\\/g, "/");
        }
        const response = await TaskService.update(body, req.params.id);
        return res.status(response.code).json(response);
    }
    delete = async (req: Request, res: Response) => {
        const response = await TaskService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
}
export default new TaskController();