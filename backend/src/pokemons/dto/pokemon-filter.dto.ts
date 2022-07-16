import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class PokemonFilterDto {
  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @Transform(({ value }) => value.split(','))
  @ApiPropertyOptional({
    description: 'Comma separated types of pokemon',
    example: 'Grass,Poison',
    type: [String],
    format: 'form',
  })
  types?: string[];
}
