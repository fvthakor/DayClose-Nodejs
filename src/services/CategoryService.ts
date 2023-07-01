import { CategoryModel } from "../interfaces";
import { Category, } from "../models";
import Service from "./Service";
import { Request } from "express";

class CategoryService extends Service {
    async create(data: CategoryModel) {
        try {

            const category = await Category.create({ ...data, mainCategory: data.mainCategory ? data.mainCategory : null });
            return this.response({ code: 201, message: 'Category added successfully!', data: category })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async getOne(id: string) {
        try {
            const category = await Category.findById(id);
            return category
                ? this.response({ code: 200, message: 'Category by id!', data: category })
                : this.response({ code: 400, message: 'Category not found!', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async update(id: string, data: CategoryModel) {
        try {
            const category = await Category.findByIdAndUpdate(id, data, { new: true });
            return category
                ? this.response({ code: 200, message: 'Category updated successfully!', data: category })
                : this.response({ code: 400, message: 'Category not found!', data: null })
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
            const catigories = await Category.find(where).skip(skip).limit(limit2).populate('mainCategory');
            const total = await Category.countDocuments(where);
            return this.response({ code: 200, message: 'All Cateory', data: catigories, total })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }

    async delete(id: string) {
        try {
            const category = await Category.findByIdAndDelete(id);
            return category
                ? this.response({ code: 200, message: 'Category deleted successfully!', data: category })
                : this.response({ code: 400, message: 'Category not found!', data: null })
        } catch (error) {
            return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null })
        }
    }

    async getAllData() {
        try {
            const categories = await Category.find().populate('pincodes');
            return this.response({ code: 200, message: 'All Categories', data: categories })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }
    async getMainCategory (){
        try{
            var where ={mainCategory:null};
            const categories = await Category.find(where);
            return this.response({code:200, message: 'Parent Categories',data:categories})
            
        }catch(error:any){

            return this.response({code:500,message:error.message,data:[]})
        }
    }
}

export default new CategoryService();