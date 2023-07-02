import mongoose, { Schema, model } from "mongoose";
import { TaskStatusModel } from "../interfaces";
const taskStatusSchema = new Schema<TaskStatusModel>({
    status: { type: String, required: true },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Taskstatus = model<TaskStatusModel>('TaskSatus', taskStatusSchema);

export default Taskstatus;