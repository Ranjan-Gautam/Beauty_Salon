import { NextRequest, NextResponse } from 'next/server';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
import { verifySession } from '@/lib/auth';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value;
  const session = token ? await verifySession(token) : null;

  if (!session || session.role !== 'SUPERADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

    const admins = await prisma.admin.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      branch: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ admins });
}
