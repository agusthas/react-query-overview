import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PageParamDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(10)
  @ApiPropertyOptional({ default: 20, minimum: 10 })
  limit?: number;
}
