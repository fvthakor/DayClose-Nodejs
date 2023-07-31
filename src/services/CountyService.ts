import { CountyModel } from "../interfaces";
import { County } from "../models";
import Service from "./Service";
import { Request } from "express";

class CountyService extends Service {
    async create(data: CountyModel) {
        try {
            const city = await County.create(data);
            return this.response({ code: 201, message: 'County added successfully!', data: city })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async getOne(id: string) {
        try {
            const city = await County.findById(id);
            return city
                ? this.response({ code: 200, message: 'County by id!', data: city })
                : this.response({ code: 400, message: 'County not found!', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async update(id: string, data: CountyModel) {
        try {
            const city = await County.findByIdAndUpdate(id, data, { new: true });
            return city
                ? this.response({ code: 200, message: 'County updated successfully!', data: city })
                : this.response({ code: 400, message: 'County not found!', data: null })
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
                ]
            }
            const cities = await County.find(where).skip(skip).limit(limit2);
            const total = await County.countDocuments(where);
            return this.response({ code: 200, message: 'All County', data: cities, total })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }

    async delete(id: string) {
        try {
            const city = await County.findByIdAndDelete(id);
            return city
                ? this.response({ code: 200, message: 'County deleted successfully!', data: city })
                : this.response({ code: 400, message: 'County not found!', data: null })
        } catch (error) {
            return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null })
        }
    }

    async getAllData() {
        try {
            const cities = await County.find();
            return this.response({ code: 200, message: 'All County', data: cities })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }
}

export default new CountyService();