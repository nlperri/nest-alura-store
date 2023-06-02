import { Entity, Column } from 'typeorm';

@Entity({ name: 'product_infos' })
export class ProductInfosEntity {
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;
}
