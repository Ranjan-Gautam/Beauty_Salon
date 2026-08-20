import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const branchNames = ["New Baneshwor", "Labim Mall", "Boudhha", "Pokhara"];

  const services = [
    { name: "Facials", price: 1500 },
    { name: "Cosmetology", price: 2000 },
    { name: "Body Relax", price: 1800 },
    { name: "Hair Styling", price: 1200 },
    { name: "Makeup", price: 3500 },
    { name: "Bridal Makeup", price: 15000 },
    { name: "Manicure", price: 800 },
    { name: "Pedicure", price: 1000 },
    { name: "Hair Spa", price: 2500 },
    { name: "Threading & Waxing", price: 600 },
    { name: "Nail Art", price: 1200 },
    { name: "Skin Whitening Treatment", price: 2800 },
  ];

  for (const name of branchNames) {
    const existing = await prisma.branch.findFirst({ where: { name } });
    if (!existing) {
      await prisma.branch.create({ data: { name } });
    }
  }

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { name: service.name },
    });
    if (existing) {
      await prisma.service.update({
        where: { id: existing.id },
        data: { price: service.price },
      });
    } else {
      await prisma.service.create({ data: service });
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
