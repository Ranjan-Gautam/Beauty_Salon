import { NextRequest, NextResponse } from 'next/server';
import { verifyUserSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('user_session')?.value;
  const session = token ? await verifyUserSession(token) : null;

  if (!session) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: { name: session.name, email: session.email } });
}
