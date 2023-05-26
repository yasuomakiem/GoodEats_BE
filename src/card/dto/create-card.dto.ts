import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCardlDto {   

    @IsString()
    @IsNotEmpty()
    quantity
}
