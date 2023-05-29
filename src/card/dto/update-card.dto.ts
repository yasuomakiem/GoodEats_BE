import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateCardlDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardlDto) {
   

    @IsString()
    @IsNotEmpty()
    quantity
}
