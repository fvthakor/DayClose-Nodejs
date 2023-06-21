"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const documentTypeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
});
const DocumentType = (0, mongoose_1.model)('DocumentType', documentTypeSchema);
exports.default = DocumentType;
