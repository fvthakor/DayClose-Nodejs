import { ObjectId } from "mongoose";

export interface StoreModel {
    name: string,
    number: string,
    address: string,
    county: ObjectId,
    city: ObjectId,
    pincode: ObjectId
}