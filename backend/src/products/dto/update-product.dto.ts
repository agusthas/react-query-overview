import { PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto
  extends PartialType(CreateProductDto)
  implements Prisma.ProductUpdateInput {}
