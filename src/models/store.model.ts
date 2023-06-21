import { Schema, model } from "mongoose";
import { StoreModel } from "../interfaces";

const storeSchema = new Schema<StoreModel>({
    name: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
});

const Store = model<StoreModel>('Store', storeSchema);

export default Store;