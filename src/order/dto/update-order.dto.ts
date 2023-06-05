import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    delivered_name?:string

    delivered_address?:string

    delivered_phone?:string
    @IsNotEmpty()
    
    status:string

    totalQuantity?:string
    
    createAt?:string

    @IsNotEmpty()
    updateAt:string
   
}
