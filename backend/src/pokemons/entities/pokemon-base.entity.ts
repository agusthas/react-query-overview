import { ApiProperty } from '@nestjs/swagger';
import { PokemonBase as PokemonBaseModel } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class PokemonBase implements PokemonBaseModel {
  @ApiProperty()
  hp: number;
  @ApiProperty()
  attack: number;
  @ApiProperty()
  defense: number;
  @ApiProperty()
  spAttack: number;
  @ApiProperty()
  spDefense: number;
  @ApiProperty()
  speed: number;

  @Exclude()
  pokemonId: number;

  constructor(partial: Partial<PokemonBase>) {
    Object.assign(this, partial);
  }
}
