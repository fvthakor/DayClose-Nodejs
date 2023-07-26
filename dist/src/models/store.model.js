"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    city: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'City'
    },
    pincode: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Pincode'
    },
});
const Store = (0, mongoose_1.model)('Store', storeSchema);
exports.default = Store;
