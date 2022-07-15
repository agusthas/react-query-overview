import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class QueryPageDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({ minimum: 1 })
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(10)
  @ApiPropertyOptional({ minimum: 10 })
  limit?: number;
}
