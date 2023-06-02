import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products = [];

  async create(data: ProductEntity) {
    this.products.push(data);
  }

  async get() {
    return this.products;
  }

  async findById(id: string) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new Error('Invalid product id');
    }

    return product;
  }

  async update(id: string, data: Partial<ProductEntity>) {
    const product = this.findById(id);

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      product[key] = value;
    });

    return product;
  }

  async delete(id: string) {
    this.findById(id);

    this.products = this.products.filter((product) => product.id !== id);
  }
}
