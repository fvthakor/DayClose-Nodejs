import { ObjectId } from "mongoose";

export interface TaskProgressModel {
    store?: string,
    user?: string,
    task: ObjectId,
    taskStatus: ObjectId,
    remark: ObjectId,
    image1: string,
    image2: string
}