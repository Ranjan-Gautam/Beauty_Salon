import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const existing = await prisma.user.findUnique({ where: { email: user.email } });

      if (!existing) {
        const randomPassword = await bcrypt.hash(
          Math.random().toString(36) + Date.now().toString(36),
          10
        );
        await prisma.user.create({
          data: {
            name: user.name || "Google User",
            email: user.email,
            password: randomPassword,
          },
        });
      }

      return true;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});
