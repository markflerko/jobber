import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class LoadProductsMessage {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @Min(0)
  price: string;

  @IsInt()
  @Min(0)
  stock: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
