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
        type: Schema.Types.ObjectId,
        ref: 'TaskSatus'
    }, remark: {
        type: String
    }, image1: {
        type: String,
    }, image2: {
        type: String
    }
});

const TaskProgress = model<TaskProgressModel>('TaskProgress', taskProgressSchema);

export default TaskProgress;