import { Schema, models, model } from "mongoose";

export interface ISiteContent {
 key: string;
 fields: Record<string, unknown>;
 updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>({
 key: { type: String, required: true, unique: true },
 fields: { type: Schema.Types.Mixed, default: {} },
 updatedAt: { type: Date, default: Date.now },
});

export default models.SiteContent || model<ISiteContent>("SiteContent", SiteContentSchema);
