"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const citySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
});
const City = (0, mongoose_1.model)('City', citySchema);
exports.default = City;
