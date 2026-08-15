import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import TeamMember from "./lib/models/TeamMember.ts";

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  await TeamMember.insertMany([
    {
      name: "Syed Ghazi",
      role: "Founder",
      photo: "",
      bio: "Syed Ghazi is the Founder of Orbitwelve, leading the company's marketing, social media, and creative direction with a strong focus on brand growth and impactful digital outreach.",
      order: 1,
    },
    {
      name: "Maryam Hassny",
      role: "CEO & Co-Founder",
      photo: "",
      bio: "Syeda Maryam Hassny is the CEO and Co-Founder of Orbitwelve, leading its vision and growth through innovation, creativity, and results-driven digital solutions.",
      order: 2,
    },
  ]);

  console.log("Seeded 2 team members");
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
