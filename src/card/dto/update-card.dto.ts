import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCardlDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardlDto) {
   

    @IsNumber()
    @IsNotEmpty()
    quantity
}
