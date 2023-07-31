import { Request, Response } from "express";
import { CountyService } from "../services";

class CountyController {
    constructor() {

    }

    create = async (req: Request, res: Response) => {
        const response = await CountyService.create(req.body);
        return res.status(response.code).json(response);
    }

    getOne = async (req: Request, res: Response) => {
        const response = await CountyService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }

    getAll = async (req: Request, res: Response) => {
        const response = await CountyService.getAll(req);
        return res.status(response.code).json(response);
    }

    update = async (req: Request, res: Response) => {
        const response = await CountyService.update(req.params.id, req.body);
        return res.status(response.code).json(response);
    }

    delete = async (req: Request, res: Response) => {
        const response = await CountyService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
    getAllData = async (req: Request, res: Response) => {
        const response = await CountyService.getAllData();
        return res.status(response.code).json(response);
    }
}

export default new CountyController();