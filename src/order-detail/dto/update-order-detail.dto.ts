import { PartialType } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './create-order-detail.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {
    // @IsNumber()
    // @IsNotEmpty()
    // price

    @IsNumber()
    @IsNotEmpty()
    quantity
}
