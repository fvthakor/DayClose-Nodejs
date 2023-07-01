import { CityModel } from "../interfaces";
import { City } from "../models";
import Service from "./Service";
import { Request } from "express";

class CityService extends Service {
    async create(data: CityModel) {
        try {
            const city = await City.create(data);
            return this.response({ code: 201, message: 'City added successfully!', data: city })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async getOne(id: string) {
        try {
            const city = await City.findById(id);
            return city
                ? this.response({ code: 200, message: 'City by id!', data: city })
                : this.response({ code: 400, message: 'City not found!', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async update(id: string, data: CityModel) {
        try {
            const city = await City.findByIdAndUpdate(id, data, { new: true });
            return city
                ? this.response({ code: 200, message: 'City updated successfully!', data: city })
                : this.response({ code: 400, message: 'City not found!', data: null })
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
            const cities = await City.find(where).skip(skip).limit(limit2);
            const total = await City.countDocuments(where);
            return this.response({ code: 200, message: 'All Cities', data: cities, total })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }

    async delete(id: string) {
        try {
            const city = await City.findByIdAndDelete(id);
            return city
                ? this.response({ code: 200, message: 'City deleted successfully!', data: city })
                : this.response({ code: 400, message: 'City not found!', data: null })
        } catch (error) {
            return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null })
        }
    }

    async getAllData() {
        try {
            const cities = await City.find().populate('pincodes');
            return this.response({ code: 200, message: 'All Cities', data: cities })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }
}

export default new CityService();