import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {UserEntity as User} from './user.entiy/user.entity'
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import UserDto from "./user.dto/create-user.dto";
import UpdateUserDto from "./user.dto/update-user.dto";


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User> 
    ){}  
    
    async getUser(id:number): Promise<User[]> {
        return await this.userRepository.find({
            relations:{
                ord:true,
                card:true,
                
              },
            where: {id: id}}  )
        
       
      }

    async create(user: UserDto): Promise<User>{        
        return this.userRepository.save(user)
    }

    async update(id:number, user:UpdateUserDto): Promise<UpdateResult>{
        return await this.userRepository.update(id,user);

    }

    async delete(id:number): Promise<DeleteResult>{
        return await this.userRepository.delete(id);
    }
}