import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const bcrypt = (await import('bcryptjs')).default;
  const { connectDB } = await import('../lib/utils/db');
  const { default: User } = await import('../lib/models/User');

  const EMAIL = 'demo@orbitwelve.com';
  const PASSWORD = 'Demo@12345';

  await connectDB();
  const user = await User.findOne({ email: EMAIL.toLowerCase() });
  if (!user) {
    console.log('NO USER FOUND for', EMAIL);
    process.exit(1);
  }
  const valid = await bcrypt.compare(PASSWORD, user.passwordHash);
  console.log('user found:', user.email);
  console.log('password valid:', valid);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
