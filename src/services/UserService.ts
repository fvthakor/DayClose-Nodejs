import { UserModel } from "../interfaces";
import { User } from "../models";
import * as bcrypt from 'bcrypt' 
import Service from "./Service";
import RequestCustom from "../interfaces/RequestCustom.interface";

class UserService extends Service{
    async create(data:UserModel){
        try{ 
            const hash = await bcrypt.hash(data.password, process.env.PASSWORD_SALT ? +process.env.PASSWORD_SALT : 10);
            const user = await User.create({...data, password: hash});
            return this.response({code: 201, message: 'User added successfully!', data: user})
        }catch(error){
            console.log(error);
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }
    async getOne(id:string){
        try{
            const user = await User.findById(id);
            return user 
                ? this.response({code: 200, message: 'User by id!', data: user}) 
                : this.response({code: 400, message: 'User not found!', data: null}) 
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async update(id:string, data:UserModel){
        try{
            const user = await User.findByIdAndUpdate(id, data, {new:true});
            if(user){
                return this.response({code: 200, message: 'User updated successfully!', data: user}) 
            }else{
                return this.response({code: 400, message: 'User not found!', data: null}) 
            }
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async getAll(req: RequestCustom){
        try{
            let { page, limit, query } = req.query;
            let skip = page && typeof page === 'string' ? Number(page) : 1
            const limit2 = limit && typeof limit === 'string' ? Number(limit) : 10;
            skip = (skip - 1) * limit2;
            console.log('req.role', req.role);
            let where:any = {
                role: req.role === 'admin' ? 'manager' : 'employee'
            }
            if(req.role === 'manager'){
                where.store = req.storeId
            }

            if (typeof query === 'string' && query.trim() !== '') {
                where['$or'] = [
                    { "firstName": { $regex: new RegExp(query, "ig") } },
                    { "lastName": { $regex: new RegExp(query, "ig") } },
                    { "address": { $regex: new RegExp(query, "ig") } },
                    { "email": { $regex: new RegExp(query, "ig") } },
                    //{ "pincode": { $regex: new RegExp(query, "ig") } },
                ]
            }

            const users = await User.find(where).skip(skip).limit(limit2);
            const total = await User.countDocuments(where);
            return this.response({code: 200, message: 'All Users', data: users, total}) 
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: []})
        }
    }

    async delete(id:string){
        try{
            const user = await User.findByIdAndDelete(id);
            if(user){
                return this.response({code: 200, message: 'User deleted successfully!', data: user}) 
            }else{
                return this.response({code: 400, message: 'User not found!', data: null}) 
            }
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    getEmployee = async(storeId:string) => {
        try{
            console.log('storeId',storeId);
            const users = await User.find({
                store: storeId,
                role: 'employee'
            });
            return this.response({code: 200, message: 'All Store employee', data: users}) 
        }catch(error:any){
            return this.response({code: 500, message: error.message, data: []})
        }
    } 
}

export default new UserService();