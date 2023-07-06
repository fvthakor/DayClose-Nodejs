import { TaskModel } from "../interfaces";
import { Task } from "../models";
import Service from "./Service";
import { Request } from "express";

class TaskService extends Service {
    async create(data: TaskModel) {
        try {
            const category = await Task.create(data);
            return this.response({ code: 201, message: 'Task added successfully!', data: category })
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
                    { "status": { $regex: new RegExp(query, "ig") } },
                ]
            }
            const task = await Task.find(where)
            .populate('category')
            .populate('store')
            .populate('subCategory')
            .populate('employee').skip(skip).limit(limit2);
            const total = await Task.countDocuments(where);

            return this.response({ code: 200, message: 'Task status', data: task, total });
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] });
        }
    }
    async getOne(id: string) {
        try {
            const task = await Task.findById(id).populate('employee');
            return task
                ? this.response({ code: 200, message: 'Task status', data: task })
                : this.response({ code: 400, message: 'Task status not found', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }
    async update(data: TaskModel, id: string) {
        try {
            const task = await Task.findByIdAndUpdate(id, data, { new: true });
            return this.response({ code: 200, message: 'Task updated successfully', data: task });
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null });

        }
    }
    async delete(id: string) {
        try {
            const task = await Task.findByIdAndDelete(id);
            return task
                ? this.response({ code: 200, message: 'Task status', data: task })
                : this.response({ code: 400, message: 'Task status not found', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

}

export default new TaskService();