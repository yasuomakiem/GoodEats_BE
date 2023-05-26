import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JWTStrategy } from './auth/auth.strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ProductModule } from './product/product.module';
import { VoucherModule } from './voucher/voucher.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { CardModule } from './card/card.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'testfood',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      // entities: [User],
      synchronize: true,
    }),   
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    RestaurantModule,
    ProductModule,
    VoucherModule,
    OrderModule,
    OrderDetailModule,
    CardModule
    
  ],
  controllers: [AppController],
  providers: [AppService,JWTStrategy],
})
export class AppModule {}
