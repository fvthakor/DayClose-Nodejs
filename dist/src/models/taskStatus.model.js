"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskStatusSchema = new mongoose_1.Schema({
    status: { type: String, required: true },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store',
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    }
});
const Taskstatus = (0, mongoose_1.model)('TaskSatus', taskStatusSchema);
exports.default = Taskstatus;
