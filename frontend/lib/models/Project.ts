import { Schema, models, model, Types } from "mongoose";

export interface IProject {
 title: string;
 client: string;
 description: string;
 images: string[];
 serviceRef?: Types.ObjectId;
 order: number;
 published: boolean;
}

const ProjectSchema = new Schema<IProject>({
 title: { type: String, required: true },
 client: { type: String, default: "" },
 description: { type: String, default: "" },
 images: { type: [String], default: [] },
 serviceRef: { type: Schema.Types.ObjectId, ref: "Service" },
 order: { type: Number, default: 0 },
 published: { type: Boolean, default: true },
});

export default models.Project || model<IProject>("Project", ProjectSchema);
