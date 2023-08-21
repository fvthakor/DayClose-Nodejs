
import { LoginModel, UserModel } from "../interfaces";
import { User } from "../models";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import Service from "./Service";
import { Response } from "express";
class AuthService extends Service {
    register = async (data: UserModel) => {
        try {

            const checkUser = await User.findOne({
                email: data.email
            })
            if(checkUser){
                return this.response({ code: 400, message: 'Email already exits!', data: null })                
            }
            const password = data.password ? data.password : '123456';
            const solt = process.env.PASSWORD_SALT ? +process.env.PASSWORD_SALT : 10;
            const hash = await bcrypt.hash(password.toString(), solt);
            const user = await User.create({
                ...data,
                role: data.role ? data.role : 'employee',
                email: data.email ? data.email : `${Date.now() + '-' + Math.round(Math.random() * 1E9)}@gmail.com`,
                password: hash
            });
            return this.response(
                {
                    code: 200,
                    message: 'Register successfull!',
                    data: user,
                })
        } catch (error: any) {
            console.log(error);
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    login = async (data: LoginModel, res: Response) => {
        const user = await User.findOne({ email: data.email });
        if (user) {
            const checkPassword = await bcrypt.compare(data.password, user.password);
            if (checkPassword) {
                const userData = {
                    _id: user._id,
                    name: user.name,
                    role: user.role,
                    email: user.email,
                    store: user.store,
                    address: user.address,
                    city: user.city,
                    pincode: user.pincode,
                    county: user.county,
                }
                const token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 'drc' , {
                    expiresIn: '45d' 
                });
                res.cookie('authToken', token);
                return this.response(
                    {
                        code: 200,
                        message: 'Login successfull!.',
                        data: { ...userData, authToken: token, refreshToken: token },
                    })
            } else {
                return this.response({ code: 400, message: 'Email or Password is wrong!.', data: null })
            }
        } else {
            return this.response({ code: 400, message: 'Email or Password is wrong!.', data: null })
        }
    }

    me = async (userId: string) => {
        const user = await User.findById(userId);
        if (user) {
            const userData = {
                _id: user._id,
                name: user.name,
                role: user.role,
                email: user.email,
                store: user.store,
                address: user.address,
                    city: user.city,
                    pincode: user.pincode,
                county: user.county,
                pic: user.employeePhoto ? user.employeePhoto : './assets/media/avatars/300-1.jpg'
            }
            return userData;
        } else {
            return false
        }
    }
}

export default new AuthService();