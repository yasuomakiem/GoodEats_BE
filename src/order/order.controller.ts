import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':userId/:resId')
  create(
    @Param('userId') userId:number,
    @Param('resId') resId:number,
    
    @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(userId,resId,createOrderDto);
  }
 
  @Get()
  getAll(){
    return this.orderService.getAllOrder()
  }
  @Get(':id')
  getOrder(@Param('id')id: number){
    return this.orderService.getOrder(id)
  }
  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.getByUserId(+id);
  }
  @Get('res/:id')
  findByRes(@Param('id') id: string) {
    return this.orderService.getByResId(+id);
  }

  @Put(':id/:userId/:resId')
  update(@Param('id')id: number,@Param('userId') userId:number,@Param('resId') resId:number,
  @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id,userId,resId,updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
