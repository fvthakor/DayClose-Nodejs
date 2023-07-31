import mongoose, { Schema, model } from "mongoose";
import { BannerModel } from "../interfaces";

const bannerSchema = new Schema<BannerModel>({
    image: { type: String },
    title: { type: String, required: true },
    text: { type: String, required: true },
    banner: {
        type: String,
        get: (value: any) => {
            return process.env.SERVER_URL
                ? value
                    ? `${process.env.SERVER_URL}/${value}`
                    : null
                : value;
        }
    },

    type: { type: String, enum: ['link', 'text', 'banner'], default:'banner' },
    link: {type: String}
} ,{ toJSON: { getters: true } });

const Banner = model<BannerModel>('Banner', bannerSchema);

export default Banner;