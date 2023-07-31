import { Request, Response } from "express";
import { BannerService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";
import { BannerModel } from "../interfaces";

class BannerController {
    constructor() {

    }

    create = async (req: RequestCustom, res: Response) => {
        const files: any = req.files;
        let body: BannerModel = req.body;
        if (files && files['banner']) {
            body.banner = files['banner'][0].path.replace(/\\/g, "/");
        }
        const response = await BannerService.create(body);
        return res.status(response.code).json(response);
    }

    getOne = async (req: Request, res: Response) => {
        const response = await BannerService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }

    getAll = async (req: Request, res: Response) => {
        const response = await BannerService.getAll(req);
        return res.status(response.code).json(response);
    }

    update = async (req: Request, res: Response) => {
        const files: any = req.files;
        let body: BannerModel = req.body;
        if (files && files['banner']) {
            body.banner = files['banner'][0].path.replace(/\\/g, "/");
        }
        const response = await BannerService.update(req.params.id, body);
        return res.status(response.code).json(response);
    }

    delete = async (req: Request, res: Response) => {
        const response = await BannerService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
    getAllData = async (req: Request, res: Response) => {
        const response = await BannerService.getAllData();
        return res.status(response.code).json(response);
    }
}

export default new BannerController();