import { Module, forwardRef } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail]),    
    forwardRef(()=>OrderModule ),
    forwardRef(()=>ProductModule ),
  
 
  ],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  exports: [TypeOrmModule],

})
export class OrderDetailModule {}
