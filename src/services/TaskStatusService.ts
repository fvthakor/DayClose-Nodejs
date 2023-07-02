import { TaskStatusModel } from "../interfaces/TaskStatus.interface";
import Taskstatus from "../models/taskStatus.model";
import Service from "./Service";
import { Request } from "express";

class TaskStatusService extends Service {
    async create(data: TaskStatusModel) {
        try {
            const taskStatus = await Taskstatus.create(data);
            return this.response({ code: 201, message: 'Taskstatus created successfully', data: taskStatus });

        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] });
        }
    }
    async getAll(req:Request) {
        try {
            
            let { page, limit, query } = req.query;
            console.log(page);
            console.log(limit);
            let skip = page && typeof page === 'string' ? Number(page) : 1
            const limit2 = limit && typeof limit === 'string' ? Number(limit) : 10;
            skip = (skip - 1) * limit2;
            let where: any = {}
            if (typeof query === 'string' && query.trim() !== '') {
                where['$or'] = [
                    { "status": { $regex: new RegExp(query, "ig") } },
                ]
            }
            const taskStatus = await Taskstatus.find(where).skip(skip).limit(limit2);
                        const total = await Taskstatus.countDocuments(where);

            return this.response({ code: 200, message: 'Task status', data: taskStatus,total });
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] });
        }
    }
    async getOne(id: string) {
        try {
            const taskStatus = await Taskstatus.findById(id);
            return taskStatus
                ? this.response({ code: 200, message: 'Task status', data: taskStatus })
                : this.response({ code: 400, message: 'Task status not found', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }
    async update(data: TaskStatusModel, id: string) {
        try {
            const taskStatus = await Taskstatus.findByIdAndUpdate(id, data, { new: true });
            return this.response({ code: 200, message: 'Task updated successfully', data: taskStatus });
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })

        }
    }
    async delete(id: string) {
        try {
            const taskStatus = await Taskstatus.findByIdAndRemove(id);
            return taskStatus
                ? this.response({ code: 200, message: 'Task status', data: taskStatus })
                : this.response({ code: 400, message: 'Task status not found', data: null })

        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }
}

export default new TaskStatusService(); 