import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsNotEmpty,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto implements Prisma.ProductCreateInput {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  readonly name: string;

  @MaxLength(150)
  @ApiPropertyOptional()
  readonly description?: string;

  @Min(1.0)
  @ApiProperty()
  readonly price: number;

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  readonly sku: string;

  @IsBoolean()
  @ApiPropertyOptional({ default: true })
  readonly published?: boolean = true;
}
