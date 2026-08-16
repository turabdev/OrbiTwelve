import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const { connectDB } = await import('../lib/utils/db');
  const { default: SiteContent } = await import('../lib/models/SiteContent');

  await connectDB();

  const existing = await SiteContent.findOne({ key: 'hero' });
  if (!existing) {
    console.log('No doc found with key "hero" — nothing to migrate.');
    process.exit(0);
  }

  const alreadyMigrated = await SiteContent.findOne({ key: 'hero-home' });
  if (alreadyMigrated) {
    console.log('A doc with key "hero-home" already exists — refusing to overwrite. Check manually.');
    process.exit(1);
  }

  existing.key = 'hero-home';
  await existing.save();

  console.log('Migrated: key "hero" -> "hero-home"');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
