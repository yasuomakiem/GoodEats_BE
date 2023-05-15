import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {

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

  @IsNotEmpty()
  avata: string;
}
