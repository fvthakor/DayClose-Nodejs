import mongoose, { Schema, model } from "mongoose";
import { TaskProgressModel } from "../interfaces";

const taskProgressSchema = new Schema<TaskProgressModel>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }, store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    }, task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }, taskStatus: {
        type: String
    }, remark: {
        type: String
    }, image1: {
        type: String,
        get: (value: any) => {
            return process.env.SERVER_URL
                ? value
                    ? `${process.env.SERVER_URL}/${value}`
                    : null
                : value;
        }
    }, image2: {
        type: String,
        get: (value: any) => {
            return process.env.SERVER_URL
                ? value
                    ? `${process.env.SERVER_URL}/${value}`
                    : null
                : value;
        }
    }
}, { toJSON: { getters: true } });

const TaskProgress = model<TaskProgressModel>('TaskProgress', taskProgressSchema);

export default TaskProgress;