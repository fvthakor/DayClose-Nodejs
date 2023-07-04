"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskProgressSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    }, store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store',
    }, task: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Task'
    }, taskStatus: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'TaskSatus'
    }, remark: {
        type: String
    }, image1: {
        type: String,
    }, image2: {
        type: String
    }
});
const TaskProgress = (0, mongoose_1.model)('TaskProgress', taskProgressSchema);
exports.default = TaskProgress;
