import { NextFunction, Response } from "express";
import * as jwt from 'jsonwebtoken'
import RequestCustom from "../interfaces/RequestCustom.interface";

export const checkAuth = async (req: RequestCustom, res: Response, next: NextFunction) => {
    // return async (req:RequestCustom, res:Response, next:NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader)
            return res.status(401).json({ code: 401, message: 'Please provide auth token!', data: null })

        const token = authHeader ? authHeader.split(' ')[1] : '';
        if (token) {
            const accessToken = process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 'drc'
            const decoded: any = await jwt.verify(token, accessToken);
            if (decoded) {
                if (typeof decoded !== 'string') {
                    req.userId = decoded._id;
                    return next();
                } else {
                    return res.status(401).json({
                        code: 401,
                        message: 'Unauthorize access!',
                        data: null
                    })
                }
            } else {
                return res.status(401).json({
                    code: 401,
                    message: 'Unauthorize access!',
                    data: null
                })
            }
        } else {
            return res.status(401).json({
                code: 401,
                message: 'Unauthorize access!',
                data: null
            })
        }
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: 'Request failed due to an internal error!',
            data: null
        })
    }
    //}
}
