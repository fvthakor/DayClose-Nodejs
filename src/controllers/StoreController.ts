import { Request, Response } from "express";
import { StoreService, UserService } from "../services";

class StoreController {
    constructor() {

    }

    create = async (req: Request, res: Response) => {
        const response = await StoreService.create(req.body);
        return res.status(response.code).json(response);
    }

    getOne = async (req: Request, res: Response) => {
        const response = await StoreService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }

    getAll = async (req: Request, res: Response) => {
        const response = await StoreService.getAll(req);
        return res.status(response.code).json(response);
    }

    update = async (req: Request, res: Response) => {
        const response = await StoreService.update(req.params.id, req.body);
        return res.status(response.code).json(response);
    }

    delete = async (req: Request, res: Response) => {
        const response = await StoreService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
}

export default new StoreController();