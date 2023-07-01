import { Schema, model } from "mongoose";
import { UserModel } from "../interfaces";

const userSchema = new Schema<UserModel>({
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
        type: Schema.Types.ObjectId, ref: 'City'
    },
    pincode: {
        type: Schema.Types.ObjectId, ref: 'Pincode'
    },
    documentType: {
        type: Schema.Types.ObjectId, ref: 'DocumentType'
    },
    documentNumber: { type: String },
    documentFront: {
        type: String,
        get: (value: any) => {
            return process.env.SERVER_URL
                ? value
                    ? `${process.env.SERVER_URL}/${value}`
                    : null
                : value;
        }
    },
    documentBack: { type: String },
    skill: {
        type: Schema.Types.ObjectId, ref: 'Skill'
    },
    store: {
        type: Schema.Types.ObjectId, ref: 'Store'
    },
    remark1: { type: String },
    remark2: { type: String },
    employeePhoto: {
        type: String,
        get: (value: any) => {
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

const User = model<UserModel>('User', userSchema);

export default User;