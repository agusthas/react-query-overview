import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: Product })
  async create(@Body() data: CreateProductDto): Promise<Product> {
    const product = await this.productsService.create(data);
    return new Product(product);
  }

  @Get()
  @ApiOkResponse({ type: [Product] })
  async getAll(@Query() query: GetAllQueryDto): Promise<Product[]> {
    const { take } = query;
    const products = await this.productsService.getAll({
      take,
      orderBy: { updatedAt: 'desc' },
    });
    return products.map((product) => new Product(product));
  }

  @Get('publish')
  @ApiOkResponse({ type: [Product] })
  async getAllPublish(@Query() query: GetAllQueryDto): Promise<Product[]> {
    const { take } = query;
    const products = await this.productsService.getAll({
      take,
      where: { published: true },
      orderBy: { updatedAt: 'desc' },
    });
    return products.map((product) => new Product(product));
  }

  @Get('drafts')
  @ApiOkResponse({ type: [Product] })
  async getAllDrafts(@Query() query: GetAllQueryDto): Promise<Product[]> {
    const { take } = query;
    const products = await this.productsService.getAll({
      take,
      where: { published: false },
      orderBy: { updatedAt: 'desc' },
    });
    return products.map((product) => new Product(product));
  }

  @Get(':id')
  @ApiOkResponse({ type: Product })
  async getOne(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.getOne({ id });
    return new Product(product);
  }

  @Put(':id')
  @ApiOkResponse({ type: Product })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsService.update({ where: { id }, data });
    return new Product(product);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Product })
  async delete(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.delete({ id });
    return new Product(product);
  }
}
