import { Module,forwardRef } from '@nestjs/common';
import { UpdateStatusService } from './update-status.service';
import { UpdateStatusGateway } from './update-status.gateway';
import { OrderModule } from 'src/order/order.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { UserEntity } from 'src/user/user.entiy/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order,UserEntity]),
    forwardRef(()=> OrderModule),
    forwardRef(()=> UserModule),

    
],
  providers: [UpdateStatusGateway, UpdateStatusService,UserService],
  exports: [TypeOrmModule],

})
export class UpdateStatusModule {}
