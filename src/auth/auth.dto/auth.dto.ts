import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class AuthDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;
}