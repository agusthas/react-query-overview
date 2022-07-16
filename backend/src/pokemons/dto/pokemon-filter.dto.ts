import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class PokemonFilterDto {
  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @Transform(({ value }) => {
    console.log({ value, type: typeof value });
    return value.split(',');
  })
  @ApiPropertyOptional({ type: [String] })
  types?: string[];
}
