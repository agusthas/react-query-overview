import { ApiProperty } from '@nestjs/swagger';
import { PokemonType as PokemonTypeModel } from '@prisma/client';

export class PokemonType implements PokemonTypeModel {
  @ApiProperty()
  type: string;

  constructor(partial: Partial<PokemonType>) {
    Object.assign(this, partial);
  }
}
