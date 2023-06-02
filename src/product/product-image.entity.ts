import { Entity, Column } from 'typeorm';

@Entity({ name: 'product_images' })
export class ProductImageEntity {
  @Column({ name: 'url', length: 100, nullable: false })
  url: string;
  @Column({ name: 'description', length: 255, nullable: false })
  description: string;
}
