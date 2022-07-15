import { ApiProperty } from '@nestjs/swagger';
import { Pokemon as PokemonModel } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { PokemonBase } from './pokemon-base.entity';
import { PokemonName } from './pokemon-name.entity';
import { PokemonType } from './pokemon-type.entity';

export class Pokemon implements PokemonModel {
  @ApiProperty()
  id: number;

  @Transform(({ value }) => new PokemonName(value))
  @ApiProperty({ type: PokemonName, nullable: true })
  name: PokemonName | null;

  @Type(() => PokemonBase)
  @ApiProperty({ type: PokemonBase, nullable: true })
  base: PokemonBase | null;

  @ApiProperty({ type: [String] })
  @Transform(({ value }) => (value as PokemonType[]).map((v) => v.type))
  types: PokemonType[];

  constructor(partial: Partial<Pokemon>) {
    Object.assign(this, partial);
  }
}
