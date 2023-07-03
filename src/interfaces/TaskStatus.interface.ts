import { ObjectId } from "mongoose";
export interface TaskStatusModel {
    status: string,
    store: ObjectId,
    user: ObjectId,
}