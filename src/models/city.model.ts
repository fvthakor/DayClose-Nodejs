import { Schema, model } from "mongoose";
import { CityModel } from "../interfaces";

const citySchema = new Schema<CityModel>({
    name: { type: String, required: true },
}, {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

citySchema.virtual('pincodes', {
    ref: 'Pincode',
    localField: '_id',
    foreignField: 'city'
});

const City = model<CityModel>('City', citySchema);



// /pincodes

export default City;