import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDetailDto {
    @IsNumber()
    @IsNotEmpty()
    price

    @IsNumber()
    @IsNotEmpty()
    quantity
}
