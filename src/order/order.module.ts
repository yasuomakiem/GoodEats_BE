import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserService } from 'src/user/user.service';
import { VoucherService } from 'src/voucher/voucher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserModule } from 'src/user/user.module';
import { VoucherModule } from 'src/voucher/voucher.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),    
    forwardRef(()=> UserModule),
    forwardRef(()=> VoucherModule),
    forwardRef(()=> RestaurantModule),
  
 
  ],
  controllers: [OrderController],
  providers: [OrderService,UserService,VoucherService],
  exports: [TypeOrmModule],

})
export class OrderModule {}
