import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO, ProductImageDTO } from './dto/create-product.dto';
import { ProductEntity } from './product.entity';
import { v4 as uuid } from 'uuid';
import { GetProductDTO } from './dto/get-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async create(@Body() data: CreateProductDTO) {
    const productEntity = new ProductEntity();

    productEntity.id = uuid();
    productEntity.name = data.name;
    productEntity.userId = data.userId;
    productEntity.price = data.price;
    productEntity.quantity = data.quantity;
    productEntity.description = data.description;
    productEntity.category = data.category;
    productEntity.images = data.images;
    productEntity.info = data.info;

    const product = await this.productService.create(productEntity);
    return {
      product: new GetProductDTO(
        product.id,
        product.name,
        product.userId,
        product.price,
        product.quantity,
        product.description,
        product.category,
        product.info,
        product.images,
      ),
      message: 'Product successfully registered',
    };
  }

  @Get()
  async get() {
    const products = await this.productService.get();
    const productsOutput = products.map(
      (product) =>
        new GetProductDTO(
          product.id,
          product.name,
          product.userId,
          product.price,
          product.quantity,
          product.description,
          product.category,
          product.info,
          product.images,
        ),
    );

    return productsOutput;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateProductDTO) {
    await this.productService.update(id, data);

    return {
      message: 'Product successfully updated',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.productService.delete(id);

    return {
      message: 'Product successfully deleted',
    };
  }
}
