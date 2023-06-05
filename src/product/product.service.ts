import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(productEntity: ProductEntity) {
    const product = await this.productRepository.save(productEntity);
    return product;
  }

  async get() {
    const products = await this.productRepository.find();

    return products;
  }

  async update(id: string, productEntity: UpdateProductDTO) {
    await this.productRepository.update(id, productEntity);
  }

  async delete(id: string) {
    this.productRepository.delete(id);
  }
}
