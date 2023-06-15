import { Request, Response } from "express";
import { AuthService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class AuthController {
    constructor() {

    }

    login = async (req: Request, res: Response) => {
        const response = await AuthService.login(req.body);
        return res.status(response.code).json(response);
    }

    me = async (req: RequestCustom, res: Response) => {
        const response = await AuthService.me(req.userId ? req.userId : '');
        return res.status(200).json(response);
    }

    register = async (req: Request, res: Response) => {
        const response = await AuthService.register(req.body);
        return res.status(response.code).json(response);
    }
}

export default new AuthController();