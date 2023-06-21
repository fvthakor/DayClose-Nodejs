import { DocumentTypeModel } from "../interfaces";
import { DocumentType } from "../models";
import Service from "./Service";
import { Request } from "express";

class DocumentTypeService extends Service {
    async create(data: DocumentTypeModel) {
        try {
            const document = await DocumentType.create(data);
            return this.response({ code: 201, message: 'Document Type added successfully!', data: document })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async getOne(id: string) {
        try {
            const document = await DocumentType.findById(id);
            return document
                ? this.response({ code: 200, message: 'Document Type by id!', data: document })
                : this.response({ code: 400, message: 'Document Type not found!', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async update(id: string, data: DocumentTypeModel) {
        try {
            const document = await DocumentType.findByIdAndUpdate(id, data, { new: true });
            return document
                ? this.response({ code: 200, message: 'Document Type updated successfully!', data: document })
                : this.response({ code: 400, message: 'Document Type not found!', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async getAll(req: Request) {
        try {
            let { page, limit, query } = req.query;
            let skip = page && typeof page === 'string' ? Number(page) : 1
            const limit2 = limit && typeof limit === 'string' ? Number(limit) : 10;
            skip = (skip - 1) * limit2;
            let where: any = {}
            if (typeof query === 'string' && query.trim() !== '') {
                where['$or'] = [
                    { "name": { $regex: new RegExp(query, "ig") } },
                ]
            }
            const documents = await DocumentType.find(where).skip(skip).limit(limit2);
            const total = await DocumentType.countDocuments(where);
            return this.response({ code: 200, message: 'All Document Type', data: documents, total })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }

    async delete(id: string) {
        try {
            const document = await DocumentType.findByIdAndDelete(id);
            return document
                ? this.response({ code: 200, message: 'Document Type deleted successfully!', data: document })
                : this.response({ code: 400, message: 'Document Type not found!', data: null })
        } catch (error) {
            return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null })
        }
    }
}

export default new DocumentTypeService();