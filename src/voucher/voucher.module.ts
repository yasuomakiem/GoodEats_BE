import { Module, forwardRef } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voucher]),
    forwardRef(() => RestaurantModule),
  ],
  controllers: [VoucherController],
  providers: [VoucherService],
  exports: [TypeOrmModule],

})
export class VoucherModule {}
