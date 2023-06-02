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

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async create(@Body() data: CreateProductDTO) {
    const productEntity = new ProductEntity();
    // const productImageEntity = new ProductImageEntity();
    // const productInfoEntity = new ProductInfoEntity();
    (productEntity.id = uuid()),
      (productEntity.name = data.name),
      (productEntity.userId = data.userId),
      (productEntity.price = data.price),
      (productEntity.quantity = data.quantity),
      (productEntity.description = data.description),
      (productEntity.category = data.category),
      // (productEntity.info = data.info.map((dataInfo) => {
      //   (productInfoEntity.description = dataInfo.description),
      //     (productInfoEntity.name = dataInfo.name),
      //     (productInfoEntity.description = dataInfo.description);
      //   return productInfoEntity;
      // }));
      // productEntity.images = data.images.map((dataImage) => {
      //   (productImageEntity.description = dataImage.description),
      //     (productImageEntity.url = dataImage.url);
      //   return productImageEntity;
      // });

      this.productRepository.create(productEntity);
    return {
      product: new GetProductDTO(
        productEntity.id,
        productEntity.name,
        productEntity.userId,
        productEntity.price,
        productEntity.quantity,
        productEntity.description,
        // productEntity.info,
        // productEntity.images,
        productEntity.category,
      ),
      message: 'Product successfully registered',
    };
  }

  @Get()
  async get() {
    const products = await this.productRepository.get();
    const productsOutput = products.map(
      (product) =>
        new GetProductDTO(
          product.id,
          product.name,
          product.userId,
          product.price,
          product.quantity,
          product.description,
          product.info,
          // product.images,
          // product.category,
        ),
    );

    return productsOutput;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateProductDTO) {
    const updatedProduct = await this.productRepository.update(id, data);

    return {
      updatedProduct,
      message: 'Product successfully updated',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.productRepository.delete(id);

    return {
      message: 'Product successfully deleted',
    };
  }
}
