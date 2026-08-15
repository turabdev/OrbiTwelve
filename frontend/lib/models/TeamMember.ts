import { Schema, models, model } from "mongoose";

export interface ITeamMember {
 name: string;
 role: string;
 photo: string;
 bio: string;
 order: number;
}

const TeamMemberSchema = new Schema<ITeamMember>({
 name: { type: String, required: true },
 role: { type: String, required: true },
 photo: { type: String, default: "" },
 bio: { type: String, default: "" },
 order: { type: Number, default: 0 },
});

export default models.TeamMember || model<ITeamMember>("TeamMember", TeamMemberSchema);
