import { Request, Response } from "express";
import { AuthService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";
import { UserModel } from "../interfaces";

class AuthController {
    constructor() {

    }

    login = async (req: Request, res: Response) => {
        const response = await AuthService.login(req.body, res);
        return res.status(response.code).json(response);
    }

    me = async (req: RequestCustom, res: Response) => {
        const response = await AuthService.me(req.userId ? req.userId : '');
        return res.status(200).json(response);
    }

    register = async (req: Request, res: Response) => {
        const files: any = req.files;
        let body: UserModel = req.body;
        if (files['documentFront']) {
            body.documentFront = files['documentFront'][0].path.replace(/\\/g, "/");
        }
        if (files['documentBack']) {
            body.documentBack = files['documentBack'][0].path.replace(/\\/g, "/");
        }
        if (files['employeePhoto']) {
            body.employeePhoto = files['employeePhoto'][0].path.replace(/\\/g, "/");
        }
        const response = await AuthService.register(body);
        return res.status(response.code).json(response);
    }
}

export default new AuthController();