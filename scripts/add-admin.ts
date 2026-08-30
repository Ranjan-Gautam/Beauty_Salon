import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

const [,, email, password, role] = process.argv;

if (!email || !password) {
  console.error('Usage: tsx scripts/add-admin.ts <email> <password> [ADMIN|SUPERADMIN]');
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashed = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.create({
    data: { email, password: hashed, role: (role as 'ADMIN' | 'SUPERADMIN') || 'ADMIN' },
  });
  console.log(`Admin created: ${admin.email} (${admin.role})`);
}

main().then(() => process.exit(0));
