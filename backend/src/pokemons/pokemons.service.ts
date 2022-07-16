import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/services/prisma.service';

@Injectable()
export class PokemonsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPaginated(params: {
    page: number;
    limit: number;
    where?: Prisma.PokemonWhereInput;
  }) {
    const { page, limit: take, where: filters } = params;
    // IMPORTANT FORMULA
    const skip = (page - 1) * take;

    const [count, pokemons] = await this.prismaService.$transaction([
      this.prismaService.pokemon.count({
        where: filters ?? {},
      }),
      this.prismaService.pokemon.findMany({
        skip,
        take,
        orderBy: {
          id: 'asc',
        },
        include: {
          name: true,
          base: true,
          types: true,
        },
        where: filters ?? {},
      }),
    ]);

    return {
      pokemons,
      info: {
        page,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < Math.ceil(count / take) ? page + 1 : null,
        limit: take,
        lastPage: Math.ceil(count / take),
        total: count,
      },
    };
  }
}
