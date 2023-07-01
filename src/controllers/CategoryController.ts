import { Request, Response } from "express";
import { CategoryService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class CategoryController {
    constructor() {

    }

    create = async (req: RequestCustom, res: Response) => {
        const response = await CategoryService.create({ ...req.body, store: req.storeId, user: req.userId });
        return res.status(response.code).json(response);
    }

    getOne = async (req: Request, res: Response) => {
        const response = await CategoryService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }

    getAll = async (req: Request, res: Response) => {
        const response = await CategoryService.getAll(req);
        return res.status(response.code).json(response);
    }

    update = async (req: Request, res: Response) => {
        const response = await CategoryService.update(req.params.id, req.body);
        return res.status(response.code).json(response);
    }

    delete = async (req: Request, res: Response) => {
        const response = await CategoryService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
    getAllData = async (req: Request, res: Response) => {
        const response = await CategoryService.getAllData();
        return res.status(response.code).json(response);
    }
    getMainCategory = async (req: Request, res: Response) => {
        const response = await CategoryService.getMainCategory();
        return res.status(response.code).json(response);
    }
    getSubCategory = async (req: Request, res: Response) => {
        const response = await CategoryService.getSubCategory(req.params.id);
        return res.status(response.code).json(response);
    }

}

export default new CategoryController();