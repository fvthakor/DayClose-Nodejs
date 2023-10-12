import { Schema, model } from "mongoose";
import { TaskModel } from "../interfaces";
const taskSchema = new Schema<TaskModel>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',

    }, 
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }, 
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    }, 
    detail: {
        type: String,
    }, 
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    taskDate: {
        type: Date
    }, 
    taskTime: {
        type: String,
    },
    image1: {
        type: String,
        get: (value: any) => {
            return process.env.SERVER_URL
                ? value
                    ? `${process.env.SERVER_URL}/${value}`
                    : null
                : value;
        }
    }, 
    image2: {
        type: String,
        get: (value: any) => {
            return process.env.SERVER_URL
                ? value
                    ? `${process.env.SERVER_URL}/${value}`
                    : null
                : value;
        }
    },
    status: { type: String, enum: ['pending', 'complete', 'not_now', 'assined_to_other'], default:'pending' },
    priority: { type: String, enum: ['low', 'moderate', 'high'], default:'low' },
    autoCreate: {
        type: String, enum: ['true', 'false'], default:'false'
    },
}, { toJSON: { getters: true } });

const Task = model<TaskModel>('Task', taskSchema);
export default Task;