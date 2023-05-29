import { Controller, Post,Get, Param, Body, Put, Delete,UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import {UserEntity as User} from './user.entiy/user.entity'
import * as argon from 'argon2';
import UserDto from "./user.dto/create-user.dto";
import { DeleteResult, UpdateResult } from "typeorm";
import UpdateUserDto from "./user.dto/update-user.dto";
// import { AccessTokenGuard } from "src/auth/guards/accesstoken.guard";


@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){}  

    @Post('register')
    async createUser(       
        @Body() user:UserDto
    ):Promise<User>{
        const hashedPass = await argon.hash(user.password);
        user.password =hashedPass
        delete user.confirmpassword
        return this.userService.create(user);
    }
    @Get('profile/:id') 
    public getUser(@Param('id') id: number): Promise<User[]> {
      return this.userService.getUser(id);
    }

    // @UseGuards(AccessTokenGuard)
    @Put('edit/:id')
    async updateUser(
        @Param('id') id : number,
        @Body() user:UpdateUserDto
    ):Promise<UpdateResult>{
        const hashedPass = await argon.hash(user.password);
        user.password =hashedPass
        return await this.userService.update(id,user)
    }

    @Delete('delete/:id')
    async deleteUser(
        @Param('id') id:number
    ):Promise<DeleteResult>{
        return await this.userService.delete(id)
    }
}