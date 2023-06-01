import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async create(@Body() data: CreateProductDTO) {
    this.productRepository.create(data);
    return data;
  }

  @Get()
  async get() {
    return this.productRepository.get();
  }
}
