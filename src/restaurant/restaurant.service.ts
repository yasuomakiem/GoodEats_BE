import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity as User } from 'src/user/user.entiy/user.entity';

@Injectable()
export class RestaurantService {
    constructor(
      @InjectRepository(Restaurant)
      private   readonly resRepository: Repository<Restaurant>,

      @InjectRepository(User)
      private readonly userRepository: Repository<User>
    ){}

    queryBuilder(query: string) {
      return this.resRepository.createQueryBuilder(query);
    }

    async create(userId:number,createRestaurantDto: CreateRestaurantDto):Promise<Restaurant> {
    const user = await this.userRepository.findOneBy({id:userId})
    if(!user){
      throw new HttpException('Not found UserId',HttpStatus.BAD_REQUEST);
    }
    const newRes = this.resRepository.create({
      ...createRestaurantDto,
      user,
      
    });
    return this.resRepository.save(newRes);
  }

  async findAll():Promise<Restaurant[]> {
    return await this.resRepository.find({relations:['users']});
  }

  async findOne(id: number):Promise<Restaurant> {
    return await this.resRepository.findOne({where: {id: id}}  )
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto):Promise<UpdateResult>  {
    return await this.resRepository.update(id,updateRestaurantDto);

  }

  async remove(id: number):Promise<DeleteResult>  {
    return await this.resRepository.delete(id);

  }
}
