import { PrismaClient } from '@prisma/client';
import { pokemons } from './pokemon';
import { products } from './product';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');
  // for (const data of products) {
  //   await prisma.product.create({ data });
  // }

  // for (const pokemon of pokemons) {
  //   await prisma.pokemon.create({
  //     data: {
  //       name: {
  //         connectOrCreate: {
  //           where: {
  //             englishName: pokemon.name.english,
  //           },
  //           create: {
  //             englishName: pokemon.name.english,
  //             japaneseName: pokemon.name.japanese,
  //             chineseName: pokemon.name.chinese,
  //             frenchName: pokemon.name.french,
  //           },
  //         },
  //       },
  //       types: {
  //         connectOrCreate: pokemon.type.map((type) => ({
  //           where: { type },
  //           create: { type },
  //         })),
  //       },
  //       base: {
  //         create: {
  //           hp: pokemon.base.HP,
  //           attack: pokemon.base.Attack,
  //           defense: pokemon.base.Defense,
  //           spAttack: pokemon.base['Sp. Attack'],
  //           spDefense: pokemon.base['Sp. Defense'],
  //           speed: pokemon.base.Speed,
  //         },
  //       },
  //     },
  //   });
  // }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
