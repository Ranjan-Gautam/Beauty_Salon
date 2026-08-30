import { NextRequest, NextResponse } from 'next/server';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
import { verifySession } from '@/lib/auth';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get('admin_session')?.value;
  const session = token ? await verifySession(token) : null;

  if (!session || session.role !== 'SUPERADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  if (id === session.adminId) {
    return NextResponse.json({ error: 'Cannot remove your own access' }, { status: 400 });
  }

  await prisma.admin.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
