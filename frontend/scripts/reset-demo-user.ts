import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const bcrypt = (await import('bcryptjs')).default;
  const { connectDB } = await import('../lib/utils/db');
  const { default: User } = await import('../lib/models/User'); // adjust if not a default export

  const OLD_EMAIL = 'abc@gmail.com';
  const NEW_EMAIL = 'demo@orbitwelve.com';
  const NEW_PASSWORD = 'Demo@12345';
  const NEW_ROLE = 'editor';

  await connectDB();

  const dropped = await User.deleteOne({ email: OLD_EMAIL });
  console.log(`dropped ${dropped.deletedCount} user(s): ${OLD_EMAIL}`);

  const passwordHash = await bcrypt.hash(NEW_PASSWORD, 10);
  await User.create({
    name: 'Demo User',
    email: NEW_EMAIL,
    passwordHash,
    role: NEW_ROLE,
  });

  console.log(`created demo user: ${NEW_EMAIL} / ${NEW_PASSWORD} (${NEW_ROLE})`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
