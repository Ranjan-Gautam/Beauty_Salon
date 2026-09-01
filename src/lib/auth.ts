import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export interface AdminSession {
  adminId: string;
  email: string;
  role: 'ADMIN' | 'SUPERADMIN';
  branchId: string | null;
}

export async function signSession(payload: AdminSession) {
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret);
}

export async function verifySession(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}
export interface UserSession {
  userId: string;
  email: string;
  name: string;
}

export async function signUserSession(payload: UserSession) {
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(secret);
}

export async function verifyUserSession(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as UserSession;
  } catch {
    return null;
  }
}
