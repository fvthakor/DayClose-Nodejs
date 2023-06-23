import { Schema, model } from "mongoose";
import { SkillModel } from "../interfaces";

const skillSchema = new Schema<SkillModel>({
    name: { type: String, required: true },
});

const Skill = model<SkillModel>('Skill', skillSchema);

export default Skill;