import { CityModel, PincodeModel, SkillModel } from "../interfaces";
import { City, Pincode, Skill } from "../models";
import Service from "./Service";
import { Request } from "express";

class PincodeService extends Service {
    async create(data: PincodeModel) {
        try {
            const pincode = await Pincode.create(data);
            return this.response({ code: 201, message: 'Pincode added successfully!', data: pincode })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async getOne(id: string) {
        try {
            const pincode = await Pincode.findById(id).populate('city');
            return pincode
                ? this.response({ code: 200, message: 'Pincode by id!', data: pincode })
                : this.response({ code: 400, message: 'Pincode not found!', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async update(id: string, data: PincodeModel) {
        try {
            const pincode = await Pincode.findByIdAndUpdate(id, data, { new: true });
            return pincode
                ? this.response({ code: 200, message: 'Pincode updated successfully!', data: pincode })
                : this.response({ code: 400, message: 'Pincode not found!', data: null })
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
                    { "pincode": { $regex: new RegExp(query, "ig") } },
                ]
            }
            const pincodes = await Pincode.find(where).skip(skip).limit(limit2).populate('city');
            const total = await Pincode.countDocuments(where);
            return this.response({ code: 200, message: 'All Pincodes', data: pincodes, total })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }

    async delete(id: string) {
        try {
            const pincode = await Pincode.findByIdAndDelete(id);
            return pincode
                ? this.response({ code: 200, message: 'Pincode deleted successfully!', data: pincode })
                : this.response({ code: 400, message: 'Pincode not found!', data: null })
        } catch (error) {
            return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null })
        }
    }
}

export default new PincodeService();