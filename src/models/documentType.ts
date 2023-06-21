import { Schema, model } from "mongoose";
import { DocumentTypeModel } from "../interfaces";

const documentTypeSchema = new Schema<DocumentTypeModel>({
    name: { type: String, required: true },
});

const DocumentType = model<DocumentTypeModel>('DocumentType', documentTypeSchema);

export default DocumentType;