import { Request, Response } from "express";
import { PincodeService } from "../services";

class PincodeController {
    constructor() {

    }

    create = async (req: Request, res: Response) => {
        const response = await PincodeService.create(req.body);
        return res.status(response.code).json(response);
    }

    getOne = async (req: Request, res: Response) => {
        const response = await PincodeService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }

    getAll = async (req: Request, res: Response) => {
        const response = await PincodeService.getAll(req);
        return res.status(response.code).json(response);
    }

    getAllData = async (req: Request, res: Response) => {
        const response = await PincodeService.getAllData();
        return res.status(response.code).json(response);
    }


    update = async (req: Request, res: Response) => {
        const response = await PincodeService.update(req.params.id, req.body);
        return res.status(response.code).json(response);
    }

    delete = async (req: Request, res: Response) => {
        const response = await PincodeService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
}

export default new PincodeController();