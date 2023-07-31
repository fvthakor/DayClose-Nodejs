//County

import { Schema, model } from "mongoose";
import { CountyModel } from "../interfaces";

const countySchema = new Schema<CountyModel>({
    name: { type: String, required: true },
}, {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

countySchema.virtual('cities', {
    ref: 'City',
    localField: '_id',
    foreignField: 'county'
});

const County = model<CountyModel>('County', countySchema);

export default County;