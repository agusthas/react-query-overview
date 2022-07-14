import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/services/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateProductDto) {
    return await this.prismaService.product.create({ data });
  }

  async getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prismaService.product.findMany({
      skip,
      take,
      where,
      cursor,
      orderBy,
    });
  }

  async getOne(where: Prisma.ProductWhereUniqueInput) {
    const product = await this.prismaService.product.findUnique({ where });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async update(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: UpdateProductDto;
  }) {
    const { where, data } = params;
    return await this.prismaService.product.update({ where, data });
  }

  async delete(where: Prisma.ProductWhereUniqueInput) {
    return await this.prismaService.product.delete({ where });
  }
}
