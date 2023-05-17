/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength, IsNumber, Min, Validate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
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

  @IsNotEmpty()
  image: string;


  @IsNotEmpty()
  status: string; 

  description: string; 


 

 
}
