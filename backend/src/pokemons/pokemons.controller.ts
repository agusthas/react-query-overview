import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryPageDto } from '../shared/dto/query-page.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonsService } from './pokemons.service';

@ApiTags('pokemons')
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  async getPaginated(@Query() queryPageDto: QueryPageDto) {
    const pageParams = {
      page: queryPageDto.page || 1,
      limit: queryPageDto.limit || 20,
    };

    const { info, pokemons } = await this.pokemonsService.getPaginated(
      pageParams,
    );

    return {
      pokemons: pokemons.map((pokemon) => new Pokemon(pokemon)),
      info,
    };
  }
}