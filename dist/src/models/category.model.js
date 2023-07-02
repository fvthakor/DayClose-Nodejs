"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    category: { type: String, required: true },
    mainCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store',
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    }
});
const Category = (0, mongoose_1.model)('Category', categorySchema);
exports.default = Category;
