const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });
const TeamMember = require("./lib/models/TeamMember.ts").default;

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const docs = await TeamMember.find().lean();
    console.log("Count:", docs.length);
    console.log(docs);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed:", err.message);
    process.exit(1);
  });
