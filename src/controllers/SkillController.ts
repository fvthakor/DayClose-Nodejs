import { Request, Response } from "express";
import { SkillService } from "../services";

class SkillController {
    constructor() {

    }

    create = async (req: Request, res: Response) => {
        const response = await SkillService.create(req.body);
        return res.status(response.code).json(response);
    }

    getOne = async (req: Request, res: Response) => {
        const response = await SkillService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }

    getAll = async (req: Request, res: Response) => {
        const response = await SkillService.getAll(req);
        return res.status(response.code).json(response);
    }

    update = async (req: Request, res: Response) => {
        const response = await SkillService.update(req.params.id, req.body);
        return res.status(response.code).json(response);
    }

    delete = async (req: Request, res: Response) => {
        const response = await SkillService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
}

export default new SkillController();