import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class GetAllQueryDto {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  readonly take?: number;
}
