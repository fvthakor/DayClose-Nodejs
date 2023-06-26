import { Request, Response } from "express";
import { CityService } from "../services";

class CityController {
    constructor() {

    }

    create = async (req: Request, res: Response) => {
        const response = await CityService.create(req.body);
        return res.status(response.code).json(response);
    }

    getOne = async (req: Request, res: Response) => {
        const response = await CityService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }

    getAll = async (req: Request, res: Response) => {
        const response = await CityService.getAll(req);
        return res.status(response.code).json(response);
    }

    update = async (req: Request, res: Response) => {
        const response = await CityService.update(req.params.id, req.body);
        return res.status(response.code).json(response);
    }

    delete = async (req: Request, res: Response) => {
        const response = await CityService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
    getAllData = async (req: Request, res: Response) => {
        const response = await CityService.getAllData();
        return res.status(response.code).json(response);
    }
}

export default new CityController();