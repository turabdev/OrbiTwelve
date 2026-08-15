import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import TeamMember from "./lib/models/TeamMember.ts";

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  await TeamMember.updateOne(
    { name: "Syed Ghazi" },
    { $set: { photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaVmoMks9jMDS5KB2J0nHiYqfYqe_a5iWco_8zRmR2OoEbbBqbVhwY5Jk&s" } }
  );

  await TeamMember.updateOne(
    { name: "Maryam Hassny" },
    { $set: { photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-hHBbewwXyiGBeb3s1j_WKuOzzeG_5QtOI5XGaiokEQ&s" } }
  );

  console.log("Photos updated");
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
