import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { OrderDetailModule } from 'src/order-detail/order-detail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),    
    forwardRef(()=> RestaurantModule),
  
 
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
