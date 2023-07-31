import { ObjectId } from "mongoose";

export interface CityModel {
    name: string,
    county: ObjectId
}