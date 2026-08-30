import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
import { verifySession } from '@/lib/auth';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value;
  const session = token ? await verifySession(token) : null;

  if (!session || session.role !== 'SUPERADMIN') {
    return NextResponse.json({ error: 'Only SUPERADMIN can invite admins' }, { status: 403 });
  }

  const { email, password, role } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Admin with this email already exists' }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.create({
    data: { email, password: hashed, role: role === 'SUPERADMIN' ? 'SUPERADMIN' : 'ADMIN' },
  });

  return NextResponse.json({ success: true, admin: { email: admin.email, role: admin.role } });
}
