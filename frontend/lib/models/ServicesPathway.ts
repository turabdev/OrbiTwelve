import { Schema, models, model } from "mongoose";

// ── NOTE ───────────────────────────────────────────────────────────────
// This is a SEPARATE collection from Service.ts. Service.ts backs the
// ServicesView.tsx grid (slug/title/summary/tags-ish surface); this one
// backs Servicespathway.tsx's scroll-pinned pathway. Two dashboard-managed
// arrays, two shapes, per the earlier data-model decision — do not try to
// unify these into one model, the fields genuinely diverge (grid has no
// `tools`/`orbitSize`/`projects`, pathway has no `media`/`tags`).
// ──────────────────────────────────────────────────────────────────────

export interface IServiceTool {
  name: string;
  logoUrl: string;
}

export interface IProjectCard {
  title: string;
  summary: string;
  href: string;
}

export interface IServicesPathwayNode {
  serviceId: string; // was "id" on the frontend ServiceNode — renamed to
  // avoid colliding with Mongoose's own auto _id on the subdocument
  title: string;
  description: string;
  tools: IServiceTool[];
  orbitSize: number; // NEW — px, one global value per service, feeds
  // OrbitImages' itemSize prop (was a hardcoded 120 on every instance)
  order: number; // controls render order in the pathway — the frontend
  // array order IS the scroll order, so this needs to be explicit once
  // it's coming from a DB query rather than a hardcoded array literal
  projects: IProjectCard[]; // was `[ProjectCard, ProjectCard, ...ProjectCard[]]`
  // (a TS tuple enforcing "at least 2" at compile time). Mongoose/JSON
  // can't express a tuple, so the 2-item constraint moves to the
  // validator below — this is a real enforcement change, not just a
  // syntax swap, flagged per the plan.
  published: boolean;
}

const ServiceToolSchema = new Schema<IServiceTool>(
  {
    name: { type: String, required: true, trim: true },
    logoUrl: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const ProjectCardSchema = new Schema<IProjectCard>(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, default: "" },
    href: { type: String, default: "" },
  },
  { _id: false }
);

const ServicesPathwayNodeSchema = new Schema<IServicesPathwayNode>({
  serviceId: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  tools: { type: [ServiceToolSchema], default: [] },
  orbitSize: { type: Number, default: 120, min: 40, max: 400 },
  order: { type: Number, default: 0 },
  projects: {
    type: [ProjectCardSchema],
    default: [],
    validate: {
      // Enforces what the TS tuple type used to guarantee at compile
      // time. This only runs on .save()/.create() — findOneAndUpdate
      // in the API route needs { runValidators: true } explicitly set,
      // or this silently does nothing on PUT.
      validator: (v: IProjectCard[]) => v.length === 2,
      message: "Each service must have exactly 2 project cards.",
    },
  },
  published: { type: Boolean, default: true },
});

export default models.ServicesPathwayNode ||
  model<IServicesPathwayNode>("ServicesPathwayNode", ServicesPathwayNodeSchema);