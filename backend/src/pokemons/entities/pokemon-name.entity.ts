import { ApiProperty } from '@nestjs/swagger';
import { PokemonName as PokemonNameModel } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class PokemonName implements PokemonNameModel {
  @ApiProperty()
  englishName: string;
  @ApiProperty({ type: String, nullable: true })
  japaneseName: string | null;
  @ApiProperty({ type: String, nullable: true })
  chineseName: string | null;
  @ApiProperty({ type: String, nullable: true })
  frenchName: string | null;

  @Exclude()
  pokemonId: number;

  constructor(partial: Partial<PokemonName>) {
    Object.assign(this, partial);
  }
}
