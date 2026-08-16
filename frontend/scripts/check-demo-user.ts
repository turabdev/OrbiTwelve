import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const { connectDB } = await import('../lib/utils/db');
  const { default: User } = await import('../lib/models/User');

  await connectDB();
  const user = await User.findOne({ email: 'demo@orbitwelve.com' }).lean();
  console.log(JSON.stringify(user, null, 2));
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
