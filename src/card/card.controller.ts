import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CardService } from "./card.service";
import { CreateCardlDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) { }

    @Post(':prodId/:userId/:resId')
    create(
        @Param('prodId') prodId: number,
        @Param('userId') userId: number,
        @Param('resId') resId: number,
        @Body() CreateCardlDto: CreateCardlDto) {
        return this.cardService.create(prodId, userId,resId, CreateCardlDto);
    }

    @Patch(':id/:prodId/:userId/:resId')
    update(
        @Param('id') id:number,
        @Param('prodId') prodId:number,
        @Param('userId') userId:number,
        @Param('resId') resId: number,

        @Body() updateCard:UpdateCardDto){
            return this.cardService.update(id,prodId,userId,resId,updateCard)
    }

    @Get(':userId')
    getCard(
        @Param('userId') userId:number
    ){
        return this.cardService.getByUserId(userId)
    }
    @Get('res/:resId')
    getRes(
        @Param('resId') resId:number
    ){
        return this.cardService.getByResId(resId)
    }


    @Delete(':id')
    delete(
        @Param('id') id:number
    ){
        return this.cardService.deleteProduct(id)
    }
}