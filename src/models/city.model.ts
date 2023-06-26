import { Schema, model } from "mongoose";
import { CityModel } from "../interfaces";

const citySchema = new Schema<CityModel>({
    name: { type: String, required: true },
});

const City = model<CityModel>('City', citySchema);

export default City;