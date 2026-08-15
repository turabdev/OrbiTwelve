import { Schema, models, model } from "mongoose";

export interface IService {
 title: string;
 slug: string;
 description: string;
 tools: string[];
 order: number;
 image: string;
 published: boolean;
}

const ServiceSchema = new Schema<IService>({
 title: { type: String, required: true },
 slug: { type: String, required: true, unique: true },
 description: { type: String, default: "" },
 tools: { type: [String], default: [] },
 order: { type: Number, default: 0 },
 image: { type: String, default: "" },
 published: { type: Boolean, default: true },
});

export default models.Service || model<IService>("Service", ServiceSchema);
