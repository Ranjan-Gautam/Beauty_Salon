import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const branchNames = ["New Baneshwor", "Labim Mall", "Boudhha", "Pokhara"];
  const serviceNames = [
    "Facials",
    "Cosmetology",
    "Body Relax",
    "Hair Styling",
    "Makeup",
  ];

  for (const name of branchNames) {
    const existing = await prisma.branch.findFirst({ where: { name } });
    if (!existing) {
      await prisma.branch.create({ data: { name } });
    }
  }

  for (const name of serviceNames) {
    const existing = await prisma.service.findFirst({ where: { name } });
    if (!existing) {
      await prisma.service.create({ data: { name } });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });