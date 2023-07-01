"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    emplyeeId: { type: String },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    phoneNumber: { type: String },
    name: { type: String },
    email: { type: String, required: true },
    address: { type: String },
    city: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'City'
    },
    pincode: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Pincode'
    },
    documentType: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'DocumentType'
    },
    documentNumber: { type: String },
    documentFront: {
        type: String,
        get: (value) => {
            return process.env.SERVER_URL
                ? value
                    ? `${process.env.SERVER_URL}/${value}`
                    : null
                : value;
        }
    },
    documentBack: { type: String },
    skill: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Skill'
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Store'
    },
    remark1: { type: String },
    remark2: { type: String },
    employeePhoto: {
        type: String,
        get: (value) => {
            return process.env.SERVER_URL
                ? value
                    ? `${process.env.SERVER_URL}/${value}`
                    : null
                : value;
        }
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager', 'employee'], required: true }
}, { toJSON: { getters: true } });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
