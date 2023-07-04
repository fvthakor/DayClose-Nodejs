import { Request, Response } from "express";
import { TaskService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class TaskController {
    constructor() {

    }
    create = async (req: RequestCustom, res: Response) => {
        const response = await TaskService.create({ ...req.body, store: req.storeId, user: req.userId });
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
        const response = await TaskService.update(req.body, req.params.id);
        return res.status(response.code).json(response);
    }
    delete = async (req: Request, res: Response) => {
        const response = await TaskService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
}
export default new TaskController();