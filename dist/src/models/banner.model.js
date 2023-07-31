"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bannerSchema = new mongoose_1.Schema({
    image: { type: String },
    title: { type: String, required: true },
    text: { type: String, required: true },
    banner: {
        type: String,
        get: (value) => {
            return process.env.SERVER_URL
                ? value
                    ? `${process.env.SERVER_URL}/${value}`
                    : null
                : value;
        }
    },
    type: { type: String, enum: ['link', 'text', 'banner'], default: 'banner' },
    link: { type: String }
}, { toJSON: { getters: true } });
const Banner = (0, mongoose_1.model)('Banner', bannerSchema);
exports.default = Banner;
