import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {UserEntity as User} from './user.entiy/user.entity'
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import UserDto from "./user.dto/user.dto";


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User> 
    ){}

    async getAllUser(): Promise<User[]>{
        return await this.userRepository.find({
            select:['id', 'name', 'address', 'username', 'password', 'phone','email','avata','role']
        });
    }

    async create(user: UserDto): Promise<User>{        
        return this.userRepository.save(user)
    }

    async update(id:number, user:UserDto): Promise<UpdateResult>{
        return await this.userRepository.update(id,user);

    }

    async delete(id:number): Promise<DeleteResult>{
        return await this.userRepository.delete(id);
    }
}