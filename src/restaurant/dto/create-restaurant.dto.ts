import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  // @Expose()
  name: string;

  @IsNotEmpty()
  // @Expose()
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
 
  @IsNotEmpty()
  phone: string;

  // @IsNotEmpty()
  avata: string;
  
  

  

 
}
