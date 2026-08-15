import { Schema, models, model } from "mongoose";

export interface ITestimonial {
 quote: string;
 author: string;
 company: string;
 order: number;
}

const TestimonialSchema = new Schema<ITestimonial>({
 quote: { type: String, required: true },
 author: { type: String, required: true },
 company: { type: String, default: "" },
 order: { type: Number, default: 0 },
});

export default models.Testimonial || model<ITestimonial>("Testimonial", TestimonialSchema);
