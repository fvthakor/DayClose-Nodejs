import { ObjectId } from "mongoose";

export interface TaskModel {
    user?: string,
    store?: string,
    category: ObjectId,
    subCategory?: ObjectId,
    detail: string,
    employee: ObjectId,
    taskDate: Date,
    taskTime: String,
    image1: string,
    image2: string,
    status: 'pending' | 'complete' | 'not_now' | 'assined_to_other',
    priority: 'low' | 'moderate' | 'high',
}