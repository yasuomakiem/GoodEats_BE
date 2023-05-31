import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Req } from "@nestjs/common";
import { CardService } from "./card.service";
import { CreateCardlDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { Request } from 'express';
import { Card } from "./entity/card.entity";


@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) { }
  private logger = new Logger();
  isNum = (data: any) => {
    return typeof data == 'number';
  };

  @Get()
  async getAll(@Req() req: Request): Promise<Card[]> {
    const builder = this.cardService
      .queryBuilder('card')
      .innerJoinAndSelect('card.res', 'res')
      .innerJoinAndSelect('card.user', 'user');
      ;

    if (req.query.res && req.query.user) {
      const resId = req.query.res;
      const user = req.query.user;
      builder.andWhere(`user.id = ${user}`);

      // const user = req.query.user;

      // builder.andWhere(`res.id = ${res}& user.id = ${user}`);
      builder.andWhere(`res.id = ${resId}`);
      this.logger.log(builder.getQuery());
    }
    // if (req.query.user) {
    //   const user = req.query.user;
    //   builder.andWhere(`user.id = ${user}`);
    //   this.logger.log(builder.getQuery());

    // }
    return await builder.getMany();


  }



  @Post(':prodId/:userId/:resId')
  create(
    @Param('prodId') prodId: number,
    @Param('userId') userId: number,
    @Param('resId') resId: number,
    @Body() CreateCardlDto: CreateCardlDto) {
    return this.cardService.create(prodId, userId, resId, CreateCardlDto);
  }

  @Patch(':id/:prodId/:userId/:resId')
  update(
    @Param('id') id: number,
    @Param('prodId') prodId: number,
    @Param('userId') userId: number,
    @Param('resId') resId: number,

    @Body() updateCard: UpdateCardDto) {
    return this.cardService.update(id, prodId, userId, resId, updateCard)
  }

  @Get(':userId')
  getCard(
    @Param('userId') userId: number
  ) {
    return this.cardService.getByUserId(userId)
  }
  @Get('cart/:userId/:resId')
  getRes(
    @Param('userId') userId: number,

    @Param('resId') resId: number
  ) {
    return this.cardService.getByResId(userId, resId)
  }


  @Delete(':id')
  delete(
    @Param('id') id: number
  ) {
    return this.cardService.deleteProduct(id)
  }
}