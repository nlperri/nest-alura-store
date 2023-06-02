import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class ProductInfoDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;
}

export class ProductImageDTO {
  @IsUrl()
  @IsOptional()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;
}

export class UpdateProductDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1)
  @IsOptional()
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @IsOptional()
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductInfoDTO)
  @IsOptional()
  info: ProductInfoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  @IsOptional()
  images: ProductImageDTO[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category: string;
}
