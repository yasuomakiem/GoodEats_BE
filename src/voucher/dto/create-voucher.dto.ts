import { IsNotEmpty, IsString } from "class-validator";

export class CreateVoucherDto {
    @IsNotEmpty()
    @IsString()
    // @Expose()
    name: string;
  
    @IsNotEmpty()
    // @Expose()
    discout: number;
  

}
