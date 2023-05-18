import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
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
