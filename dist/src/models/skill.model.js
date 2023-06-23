"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const skillSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
});
const Skill = (0, mongoose_1.model)('Skill', skillSchema);
exports.default = Skill;
