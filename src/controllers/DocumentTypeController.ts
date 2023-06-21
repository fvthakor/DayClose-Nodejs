import { Request, Response } from "express";
import { DocumentTypeService } from "../services";

class DocumentTypeController {
    constructor() {

    }

    create = async (req: Request, res: Response) => {
        const response = await DocumentTypeService.create(req.body);
        return res.status(response.code).json(response);
    }

    getOne = async (req: Request, res: Response) => {
        const response = await DocumentTypeService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }

    getAll = async (req: Request, res: Response) => {
        const response = await DocumentTypeService.getAll(req);
        return res.status(response.code).json(response);
    }

    update = async (req: Request, res: Response) => {
        const response = await DocumentTypeService.update(req.params.id, req.body);
        return res.status(response.code).json(response);
    }

    delete = async (req: Request, res: Response) => {
        const response = await DocumentTypeService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
}

export default new DocumentTypeController();