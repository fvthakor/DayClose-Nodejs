import { ObjectId } from "mongoose";

export interface CategoryModel {
    category: string,
    mainCategory?: ObjectId,
    store: ObjectId,
    user: ObjectId,
}