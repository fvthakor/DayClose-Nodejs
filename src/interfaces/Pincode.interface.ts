import { ObjectId } from "mongoose"


export interface PincodeModel {
    pincode: string,
    city: ObjectId
}