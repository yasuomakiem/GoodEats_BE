import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  price: number;

  @Min(0)
  @Type(() => Number)
  sale_price: number;

  // @IsNotEmpty()
  image: string;


  @IsNotEmpty()
  status: string; 



}
