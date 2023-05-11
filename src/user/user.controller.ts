import { Controller, Post,Get, Param, Body, Put, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import {UserEntity as User} from './user.entiy/user.entity'
import UserDto from "./user.dto/user.dto";
import { DeleteResult, UpdateResult } from "typeorm";


@Controller('api/user')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Get()
    public getAll(): Promise<User[]>{
        return this.userService.getAllUser();
    }

    @Post()
    async createUser(       
        @Body() user:UserDto
    ):Promise<User>{
        return this.userService.create(user);
    }

    @Put(':id')
    async updateUser(
        @Param('id') id : number,
        @Body() user:UserDto
    ):Promise<UpdateResult>{
        return await this.userService.update(id,user)
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') id:number
    ):Promise<DeleteResult>{
        return await this.userService.delete(id)
    }
}