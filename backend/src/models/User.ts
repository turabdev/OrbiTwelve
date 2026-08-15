import mongoose, { Schema, models, model } from "mongoose";

export interface IUser {
 email: string;
 passwordHash: string;
 role: "admin" | "editor";
 createdAt: Date;
}

const UserSchema = new Schema<IUser>({
 email: { type: String, required: true, unique: true, lowercase: true, trim: true },
 passwordHash: { type: String, required: true },
 role: { type: String, enum: ["admin", "editor"], default: "editor" },
 createdAt: { type: Date, default: Date.now },
});

export default models.User || model<IUser>("User", UserSchema);
