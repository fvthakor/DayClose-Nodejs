import { ObjectId } from "mongoose";

export interface TaskProgressModel {
    store: ObjectId,
    user: ObjectId,
    task: ObjectId,
    taskStatus: ObjectId,
    remark: ObjectId,
    image1: string,
    image2: string
}