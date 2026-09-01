import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth-google";
import { verifyUserSession } from "@/lib/auth";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const googleSession = await auth();

  const cookieStore = await cookies();
  const token = cookieStore.get("user_session")?.value;
  const emailSession = token ? await verifyUserSession(token) : null;

  const email = googleSession?.user?.email || emailSession?.email;

  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const appointments = await prisma.appointment.findMany({
    where: { email },
    include: {
      branch: true,
      service: true,
      extraServices: {
        include: { service: true },
      },
    },
    orderBy: { date: "desc" },
  });

  return NextResponse.json({ appointments });
}