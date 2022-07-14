import { PrismaClient } from '@prisma/client';
import { products } from './product';

const prisma = new PrismaClient();

async function main() {
  for (const data of products) {
    await prisma.product.create({ data });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
