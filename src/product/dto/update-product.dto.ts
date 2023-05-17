import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNotEmpty()
    @MinLength(3)
    name: string;
  
    price: number;
  
    sale_price: number;

    image: string;

    status: string;

    description:string;  
  
   
}
