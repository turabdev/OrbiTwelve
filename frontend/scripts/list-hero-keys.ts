import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const { connectDB } = await import('../lib/utils/db');
  const { default: SiteContent } = await import('../lib/models/SiteContent');

  await connectDB();

  const docs = await SiteContent.find({ key: /hero/i }).lean();
  console.log(JSON.stringify(docs, null, 2));
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
