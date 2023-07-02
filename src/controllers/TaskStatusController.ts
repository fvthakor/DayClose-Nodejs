import { Request, Response } from "express";

import { TaskStatusService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class TaskStatusController {
    constructor() {

    }
    create = async (req: RequestCustom, res: Response) => {
        const response = await TaskStatusService.create({...req.body, store: req.storeId, user: req.userId});
        return res.status(response.code).json(response);
    }
    getAll = async (req: Request, res: Response) => {
        const response = await TaskStatusService.getAll(req);
        return res.status(response.code).json(response);
    }
    getOne = async (req: Request, res: Response) => {
        const response = await TaskStatusService.getOne(req.params.id);
        return res.status(response.code).json(response);

    }
    update = async (req: Request, res: Response) => {
        const response = await TaskStatusService.update(req.body, req.params.id);
        return res.status(response.code).json(response);

    }
    delete = async (req: Request, res: Response) => {
        const response = await TaskStatusService.delete(req.params.id);
        return res.status(response.code).json(response);
    }

}
export default new TaskStatusController();