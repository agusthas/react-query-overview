import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Product as ProductModel } from '@prisma/client';
import { Transform } from 'class-transformer';

export class Product implements ProductModel {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: String, nullable: true })
  description: string | null;
  @Transform(({ value }) => Number(value))
  @ApiProperty({ type: Number })
  price: Prisma.Decimal;
  @ApiProperty()
  sku: string;
  @ApiProperty({ default: false })
  published: boolean;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
