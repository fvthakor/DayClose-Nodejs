import { ObjectId } from "mongoose";

export interface StoreModel {
    name: string,
    number: string,
    address: string,
    city: ObjectId,
    pincode: ObjectId
}