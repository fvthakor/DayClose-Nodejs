import { error } from "console";
import { TaskProgressModel } from "../interfaces";
import { TaskProgress } from "../models";
import Service from "./Service";
import { Request } from "express";

class TaskProgressService extends Service {
    async create(data: TaskProgressModel) {
        try {
            console.log('task create', data);
            const taskProgress = await TaskProgress.create(data);
            return this.response({ code: 200, message: 'TaskProgress added successfully', data: taskProgress })
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
            const taskProgress = await TaskProgress.find().skip(skip).limit(limit2).populate("taskStatus").populate('task');
            return this.response({ code: 200, message: 'Task Progress list', data: taskProgress });
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }
    async taskStatus(req: Request) {
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
            //console.log(req.params.id);
            var wherecheck = { task: req.params.id };
            const taskProgress = await TaskProgress.find(wherecheck).skip(skip).limit(limit2).populate("taskStatus").populate('task');
            return this.response({ code: 200, message: 'Task Progress list', data: taskProgress });
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }
    async getOne(id: string) {
        try {
            const taskProgress = await TaskProgress.findById(id).populate("taskStatus").populate('task');
            return taskProgress ? this.response({ code: 200, message: 'Task progress by id', data: taskProgress })
                : this.response({ code: 500, message: 'Task progress not found', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }
    async update(id: string, data: TaskProgressModel) {
        try {
            const taskProgress = await TaskProgress.findByIdAndUpdate(id, data, { new: true });
            return this.response({ code: 200, message: 'Task progress updated successfully', data: taskProgress })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null });
        }
    }
    async delete(id: string) {
        try {
            const taskProgress = await TaskProgress.findByIdAndRemove(id);
            return this.response({ code: 200, message: 'Task progress deleted successfully', data: taskProgress })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null });
        }
    }
}
export default new TaskProgressService();