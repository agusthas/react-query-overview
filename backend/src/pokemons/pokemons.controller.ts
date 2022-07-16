import { Controller, Get, Query } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { PageParamDto } from '../shared/dto/page-param.dto';
import { ApiPageResponse } from '../shared/page/api-page-response.decorator';
import { PageInfo } from '../shared/page/page-info.dto';
import { PokemonFilterDto } from './dto/pokemon-filter.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonsService } from './pokemons.service';

@ApiExtraModels(Pokemon, PageInfo)
@ApiTags('pokemons')
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @ApiPageResponse({ model: Pokemon })
  @Get()
  async getPaginated(
    @Query() pageParams: PageParamDto,
    @Query() filters: PokemonFilterDto,
  ) {
    const { page, limit } = pageParams;
    const { types } = filters;

    const { info, pokemons } = await this.pokemonsService.getPaginated({
      page: page || 1,
      limit: limit || 20,
      where: {
        AND: (types || []).map((type) => ({
          types: { some: { type } },
        })),
      },
    });

    return {
      results: pokemons.map((pokemon) => new Pokemon(pokemon)),
      info,
    };
  }
}
