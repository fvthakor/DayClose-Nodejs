import { BannerModel } from "../interfaces";
import { Banner, } from "../models";
import Service from "./Service";
import { Request } from "express";

class BannerService extends Service {
    async create(data: BannerModel) {
        try {
            const newData = {...data, text: data.text ? data.text : 'test', title: data.title ? data.title : 'test'}
            const category = await Banner.create(newData);
            return this.response({ code: 201, message: 'Banner added successfully!', data: category })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async getOne(id: string) {
        try {
            const banner = await Banner.findById(id);
            return banner
                ? this.response({ code: 200, message: 'Banner by id!', data: banner })
                : this.response({ code: 400, message: 'Banner not found!', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async update(id: string, data: BannerModel) {
        try {
            const banner = await Banner.findByIdAndUpdate(id, data, { new: true });
            return banner
                ? this.response({ code: 200, message: 'Banner updated successfully!', data: banner })
                : this.response({ code: 400, message: 'Banner not found!', data: null })
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
                    { "title": { $regex: new RegExp(query, "ig") } },
                ]
            }
            const banners = await Banner.find(where).skip(skip).limit(limit2);
            const total = await Banner.countDocuments(where);
            return this.response({ code: 200, message: 'All Banners', data: banners, total })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }

    async delete(id: string) {
        try {
            const banner = await Banner.findByIdAndDelete(id);
            return banner
                ? this.response({ code: 200, message: 'Banner deleted successfully!', data: banner })
                : this.response({ code: 400, message: 'Banner not found!', data: null })
        } catch (error) {
            return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null })
        }
    }

    async getAllData() {
        try {
            const banners = await Banner.find();
            return this.response({ code: 200, message: 'All Banners', data: banners })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }
}

export default new BannerService();