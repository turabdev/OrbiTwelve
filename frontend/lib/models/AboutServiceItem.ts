import { Schema, models, model } from "mongoose";

// ── NOTE ───────────────────────────────────────────────────────────────
// A THIRD services collection, separate from Service.ts (the grid) and
// ServicesPathwayNode (the scroll-pinned pathway). This one backs
// AboutServices.tsx specifically — a simpler summary+description card
// with no slug/tools/projects. Do not unify with the other two; each
// backs a different component with a genuinely different shape.
// ──────────────────────────────────────────────────────────────────────

export interface IAboutServiceItem {
  title: string;
  summary: string;
  description: string;
  order: number;
  published: boolean;
}

const AboutServiceItemSchema = new Schema<IAboutServiceItem>({
  title: { type: String, required: true, trim: true },
  summary: { type: String, default: "" },
  description: { type: String, default: "" },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
});

export default models.AboutServiceItem ||
  model<IAboutServiceItem>("AboutServiceItem", AboutServiceItemSchema);
