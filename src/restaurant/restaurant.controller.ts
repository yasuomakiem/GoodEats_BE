import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Logger } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { Request } from 'express';


@Controller('api/restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  private logger = new Logger();

  isNum = (data: any) => {
    return typeof data == 'number';
  }; 
  
  // create(@Body() createRestaurantDto: CreateRestaurantDto) {
  //   return this.restaurantService.create(createRestaurantDto);
  // }

  @Get()
  async getAll(@Req() req:Request): Promise<Restaurant[]> {
    const builder = this.restaurantService
    .queryBuilder('restaurant')
    .innerJoinAndSelect('restaurant.user', 'user');
    this.logger.log(builder.getQuery());
    if (req.query.name) {
      builder.andWhere(`restaurant.name LIKE '%${req.query.name}%'`);
      this.logger.log(builder.getQuery());
      
    }
    if (req.query.sort) {
      const sort = req.query.sort;
      const sortArr = sort.toString().split('-');
      builder.orderBy(
        `restaurant.${sortArr[0]}`,
        sortArr[1] == 'ASC' ? 'ASC' : 'DESC',
      );
      this.logger.log(builder.getQuery());
    }
    if (req.query.id || this.isNum(req.query.id)) {
      const id = req.query.id;
      builder.andWhere(`restaurant.id = ${id}`);
      this.logger.log(builder.getQuery());
    }

    if (req.query.userId || this.isNum(req.query.userId)) {
      const userId = req.query.userId;
      builder.andWhere(`restaurant.user = ${userId}`);
      this.logger.log(builder.getQuery());
    }
    
    return await builder.getMany();
  }
   

  @Post('add/:userId')
  async create(
    @Param('userId') userId:number,
    @Body() data:CreateRestaurantDto
    ):Promise<Restaurant>{
      return await this.restaurantService.create(userId,data)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(+id);
  }
}
