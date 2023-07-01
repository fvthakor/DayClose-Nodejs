import mongoose, { Schema, model } from "mongoose";
import { CategoryModel, PincodeModel } from "../interfaces";

const categorySchema = new Schema<CategoryModel>({
    category: { type: String, required: true },
    mainCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    }
});

const Category = model<CategoryModel>('Category', categorySchema);

export default Category;