import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post(':productId/:orderId')
  create(
    @Param('productId') productId:number,
    @Param('orderId') orderId:number,
    @Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailService.create(productId,orderId,createOrderDetailDto);
  }

  @Patch(':id/:productId/:orderId')
  update(@Param('id') id: number, @Param('productId') productId:number,
    @Param('orderId') orderId:number, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailService.update(id,productId,orderId, updateOrderDetailDto);
  }

  @Get()
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailService.getByOrderId(+id);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailService.deleteProduct(+id);
  }
}
