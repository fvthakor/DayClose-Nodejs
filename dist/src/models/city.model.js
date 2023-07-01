"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const citySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});
citySchema.virtual('pincodes', {
    ref: 'Pincode',
    localField: '_id',
    foreignField: 'city'
});
const City = (0, mongoose_1.model)('City', citySchema);
// /pincodes
exports.default = City;
