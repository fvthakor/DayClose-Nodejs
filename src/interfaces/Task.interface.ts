import { ObjectId } from "mongoose";

export interface TaskModel {
    user: ObjectId,
    store: ObjectId,
    category: ObjectId,
    subCategory: ObjectId,
    detail: string,
    employee: ObjectId,
    taskDate: Date,
    image1: string,
    image2: string,
    status: 'pending' | 'complete' | 'not_now' | 'assined_to_other'
}