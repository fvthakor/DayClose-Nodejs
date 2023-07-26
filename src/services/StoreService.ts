import { StoreModel, UserModel } from "../interfaces";
import { Store, User } from "../models";
import * as bcrypt from 'bcrypt'
import Service from "./Service";
import { Request } from "express";

class StoreService extends Service {
    async create(data: StoreModel) {
        try {
            const store = await Store.create(data);
            return this.response({ code: 201, message: 'Store added successfully!', data: store })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async getOne(id: string) {
        try {
            const store = await Store.findById(id);
            return store
                ? this.response({ code: 200, message: 'Store by id!', data: store })
                : this.response({ code: 400, message: 'Store not found!', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async update(id: string, data: StoreModel) {
        try {
            const store = await Store.findByIdAndUpdate(id, data, { new: true });
            return store
                ? this.response({ code: 200, message: 'Store updated successfully!', data: store })
                : this.response({ code: 400, message: 'Store not found!', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async getAll(req: Request) {
        try {
            let { page, limit, query } = req.query;
            let skip = page && typeof page === 'string' ? Number(page) : 1
            const limit2 = limit && typeof limit === 'string' ? Number(limit) : 10;
            skip = (skip - 1) * limit2;
            let where: any = {}
            if (typeof query === 'string' && query.trim() !== '') {
                where['$or'] = [
                    { "name": { $regex: new RegExp(query, "ig") } },
                    { "number": { $regex: new RegExp(query, "ig") } },
                    { "address": { $regex: new RegExp(query, "ig") } },
                    //{ "city": { $regex: new RegExp(query, "ig") } },
                    //{ "pincode": { $regex: new RegExp(query, "ig") } },
                ]
            }
            const stores = await Store.find(where)
            .populate('city')
                .populate('pincode')
                .skip(skip).limit(limit2);
            const total = await Store.countDocuments(where);
            return this.response({ code: 200, message: 'All Store', data: stores, total })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }

    async delete(id: string) {
        try {
            const store = await Store.findByIdAndDelete(id);
            return store
                ? this.response({ code: 200, message: 'Store deleted successfully!', data: store })
                : this.response({ code: 400, message: 'Store not found!', data: null })
        } catch (error) {
            return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null })
        }
    }

    async getAllData() {
        try {
            const stores = await Store.find();
            return this.response({ code: 200, message: 'All Stores', data: stores })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }
}

export default new StoreService();