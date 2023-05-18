/* eslint-disable prettier/prettier */

import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { OneToMany } from "typeorm";

export default class UserDto {
  @IsNotEmpty()
  @IsString()
  // @Expose()
  name: string;

  @IsNotEmpty()
  // @Expose()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmpassword: string;

 
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

 

  @IsNotEmpty()
  role: string;

}
