import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @MinLength(3)
    name: string;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    price: number;

    @Min(0)
    @Type(() => Number)
    sale_price: number;
    
    image: string;

  
    @IsNotEmpty() 
    status: string;

  
    
  
    
  
    
    
}
