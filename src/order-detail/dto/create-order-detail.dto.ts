import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDetailDto {
    @IsString()
    @IsNotEmpty()
    price

    @IsString()
    @IsNotEmpty()
    quantity
}
