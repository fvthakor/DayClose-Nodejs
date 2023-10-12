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

    register = async (req: RequestCustom, res: Response) => {
        const files: any = req.files;
        let body: UserModel = req.body;
        if (files && files['documentFront']) {
            body.documentFront = files['documentFront'][0].path.replace(/\\/g, "/");
        }
        if (files && files['documentBack']) {
            body.documentBack = files['documentBack'][0].path.replace(/\\/g, "/");
        }
        if (files && files['employeePhoto']) {
            body.employeePhoto = files['employeePhoto'][0].path.replace(/\\/g, "/");
        }
        if (files && files['document1']) {
            body.document1 = files['document1'][0].path.replace(/\\/g, "/");
        }
        if (files && files['document2']) {
            body.document2 = files['document2'][0].path.replace(/\\/g, "/");
        }
        
        body.role = req.role === 'admin' ? 'manager' : 'employee';
        const response = await AuthService.register(body);
        return res.status(response.code).json(response);
    }

    userUpdate = async (req: RequestCustom, res: Response) => {
        const files: any = req.files;
        let body: UserModel = req.body;
        if (files && files['documentFront']) {
            body.documentFront = files['documentFront'][0].path.replace(/\\/g, "/");
        }
        if (files && files['documentBack']) {
            body.documentBack = files['documentBack'][0].path.replace(/\\/g, "/");
        }
        if (files && files['employeePhoto']) {
            body.employeePhoto = files['employeePhoto'][0].path.replace(/\\/g, "/");
        }
        if (files && files['document1']) {
            body.document1 = files['document1'][0].path.replace(/\\/g, "/");
        }
        if (files && files['document2']) {
            body.document2 = files['document2'][0].path.replace(/\\/g, "/");
        }
        const response = await AuthService.userUpdate(req.params.id, body);
        return res.status(response.code).json(response);
    }
}

export default new AuthController();