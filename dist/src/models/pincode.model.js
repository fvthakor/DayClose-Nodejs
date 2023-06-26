"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pincodeSchema = new mongoose_1.Schema({
    pincode: { type: String, required: true },
    city: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'City'
    }
});
const Pincode = (0, mongoose_1.model)('Pincode', pincodeSchema);
exports.default = Pincode;
