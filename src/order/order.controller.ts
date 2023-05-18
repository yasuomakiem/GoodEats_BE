import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':userId/:voucherId')
  create(
    @Param('userId') userId:number,
    @Param('voucherId') voucherId:number,
    @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(userId,voucherId,createOrderDto);
  }
 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.getByUserId(+id);
  }

  @Patch(':id/:userId/:voucherId')
  update(@Param('id')id: number,@Param('userId') userId:number,
  @Param('voucherId') voucherId:number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id,userId,voucherId,updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
