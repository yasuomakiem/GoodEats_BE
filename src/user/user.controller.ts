import { Controller, Post,Get, Param, Body, Put, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import {UserEntity as User} from './user.entiy/user.entity'
import * as argon from 'argon2';
import UserDto from "./user.dto/user.dto";
import { DeleteResult, UpdateResult } from "typeorm";


@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){}  

    @Post('regiter')
    async createUser(       
        @Body() user:UserDto
    ):Promise<User>{
        const hashedPass = await argon.hash(user.password);
        user.password =hashedPass
        return this.userService.create(user);
    }
    @Get('profile/:id') 
    public getUser(@Param('id') id: number): Promise<User> {
      return this.userService.getUser(id);
    }

    @Put('edit/:id')
    async updateUser(
        @Param('id') id : number,
        @Body() user:UserDto
    ):Promise<UpdateResult>{
        return await this.userService.update(id,user)
    }

    @Delete('delete/:id')
    async deleteUser(
        @Param('id') id:number
    ):Promise<DeleteResult>{
        return await this.userService.delete(id)
    }
}