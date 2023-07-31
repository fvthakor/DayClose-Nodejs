"use strict";
//County
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const countySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});
countySchema.virtual('cities', {
    ref: 'City',
    localField: '_id',
    foreignField: 'county'
});
const County = (0, mongoose_1.model)('County', countySchema);
exports.default = County;
