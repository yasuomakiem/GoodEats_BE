import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    delivered_address

    @IsNotEmpty()
    @IsString()
    delivered_phone

    @IsNotEmpty()
    @IsString()
    status
}
