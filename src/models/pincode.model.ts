import mongoose, { Schema, model } from "mongoose";
import { PincodeModel } from "../interfaces";

const pincodeSchema = new Schema<PincodeModel>({
    pincode: { type: String, required: true },
    city: {
        type: Schema.Types.ObjectId, ref: 'City'
    }
});

const Pincode = model<PincodeModel>('Pincode', pincodeSchema);

export default Pincode;