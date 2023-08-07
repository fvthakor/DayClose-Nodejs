import { Schema, model } from "mongoose";
import { StoreModel } from "../interfaces";

const storeSchema = new Schema<StoreModel>({
    name: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    county: {
        type: Schema.Types.ObjectId, ref: 'County'
    },
    city: {
        type: Schema.Types.ObjectId, ref: 'City'
    },
    pincode: {
        type: Schema.Types.ObjectId, ref: 'Pincode'
    },
});

const Store = model<StoreModel>('Store', storeSchema);

export default Store;