export class ProductInfoEntity {
  name: string;
  description: string;
}

export class ProductImageEntity {
  url: string;
  description: string;
}

export class ProductEntity {
  id: string;
  name: string;
  userId: string;
  price: number;
  quantity: number;
  description: string;
  info: ProductInfoEntity[];
  images: ProductImageEntity[];
  category: string;
}
