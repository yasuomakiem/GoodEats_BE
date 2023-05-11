import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {UserEntity as User} from './user.entiy/user.entity'


@Module({
    imports:[
        TypeOrmModule.forFeature([User])
        
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [TypeOrmModule],
    
})
export class UserModule{}