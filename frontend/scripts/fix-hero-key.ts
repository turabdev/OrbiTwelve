import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const { connectDB } = await import('../lib/utils/db');
  const { default: SiteContent } = await import('../lib/models/SiteContent');

  await connectDB();

  const wrong = await SiteContent.findOne({ key: 'hero-home' });
  if (!wrong) {
    console.log('No doc found with key "hero-home" — nothing to fix. Checking "hero"...');
    const original = await SiteContent.findOne({ key: 'hero' });
    if (!original) {
      console.log('No doc found with key "hero" either. Nothing to migrate.');
      process.exit(0);
    }
    original.key = 'home-hero';
    await original.save();
    console.log('Migrated: key "hero" -> "home-hero"');
    process.exit(0);
  }

  const target = await SiteContent.findOne({ key: 'home-hero' });
  if (target) {
    console.log('A doc with key "home-hero" already exists — refusing to overwrite. Check manually.');
    process.exit(1);
  }

  wrong.key = 'home-hero';
  await wrong.save();
  console.log('Fixed: key "hero-home" -> "home-hero"');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
