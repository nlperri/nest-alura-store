export class ProductInfoDTO {
  constructor(readonly name: string, readonly description: string) {}
}

export class ProductImageDTO {
  constructor(readonly url: string, readonly description: string) {}
}

export class GetProductDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly userId: string,
    readonly price: number,
    readonly quantity: number,
    readonly description: string,
    readonly category: string,
    readonly info: ProductInfoDTO[],
    readonly images: ProductImageDTO[],
  ) {}
}
