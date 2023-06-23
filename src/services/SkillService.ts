import { DocumentTypeModel, SkillModel } from "../interfaces";
import { DocumentType, Skill } from "../models";
import Service from "./Service";
import { Request } from "express";

class SkillService extends Service {
    async create(data: SkillModel) {
        try {
            const skill = await Skill.create(data);
            return this.response({ code: 201, message: 'Skill added successfully!', data: skill })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async getOne(id: string) {
        try {
            const skill = await Skill.findById(id);
            return skill
                ? this.response({ code: 200, message: 'Skill by id!', data: skill })
                : this.response({ code: 400, message: 'Skill not found!', data: null })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: null })
        }
    }

    async update(id: string, data: SkillModel) {
        try {
            const skill = await Skill.findByIdAndUpdate(id, data, { new: true });
            return skill
                ? this.response({ code: 200, message: 'Skill updated successfully!', data: skill })
                : this.response({ code: 400, message: 'Skill not found!', data: null })
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
            const skills = await Skill.find(where).skip(skip).limit(limit2);
            const total = await Skill.countDocuments(where);
            return this.response({ code: 200, message: 'All Skill', data: skills, total })
        } catch (error: any) {
            return this.response({ code: 500, message: error.message, data: [] })
        }
    }

    async delete(id: string) {
        try {
            const skill = await Skill.findByIdAndDelete(id);
            return skill
                ? this.response({ code: 200, message: 'Skill deleted successfully!', data: skill })
                : this.response({ code: 400, message: 'Skill not found!', data: null })
        } catch (error) {
            return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null })
        }
    }
}

export default new SkillService();