import { Request, Response } from "express";
import { TaskProgressService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class TaskProgressController {
    constructor() {

    }
    create = async (req: RequestCustom, res: Response) => {
        const response = await TaskProgressService.create(req.body);
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
        const response = await TaskProgressService.update(req.params.id, req.body);
        return res.status(response.code).json(response);
    }
    delete = async (req: Request, res: Response) => {
        const response = await TaskProgressService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
}
export default new TaskProgressController();