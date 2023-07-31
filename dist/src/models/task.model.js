"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store',
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
    },
    subCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
    },
    detail: {
        type: String,
    },
    employee: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    taskDate: {
        type: Date
    },
    taskTime: {
        type: String,
    },
    image1: {
        type: String,
        get: (value) => {
            return process.env.SERVER_URL
                ? value
                    ? `${process.env.SERVER_URL}/${value}`
                    : null
                : value;
        }
    },
    image2: {
        type: String,
        get: (value) => {
            return process.env.SERVER_URL
                ? value
                    ? `${process.env.SERVER_URL}/${value}`
                    : null
                : value;
        }
    },
    status: { type: String, enum: ['pending', 'complete', 'not_now', 'assined_to_other'], default: 'pending' },
    priority: { type: String, enum: ['low', 'moderate', 'high'], default: 'low' }
}, { toJSON: { getters: true } });
const Task = (0, mongoose_1.model)('Task', taskSchema);
exports.default = Task;
