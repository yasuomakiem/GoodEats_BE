import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity as User } from 'src/user/user.entiy/user.entity';
import { log } from 'console';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly resRepository: Repository<Restaurant>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  queryBuilder(query: string) {
    return this.resRepository.createQueryBuilder(query);
  }

  async create(userId: number, createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    let user = await  this.userRepository.findOneBy({ id: userId })
    delete user.username
    delete user.password
    delete user.phone
    delete user.email
    delete user.avata
    delete user.role
    delete user.address
    console.log(user);


    if (!user) {
      throw new HttpException('Not found UserId', HttpStatus.BAD_REQUEST);
    }
    const newRes = this.resRepository.create({
      ...createRestaurantDto,
      user

    });
    return this.resRepository.save(newRes);
  }

  getAllRes(): Promise<Restaurant[]> {
    return this.resRepository.find({
      relations: ['user'],
    });
  }

  async getbyUserId(id:number):Promise<Restaurant[]>{
    const user = await this.userRepository.findOne({
      where: [{id:id}]
    });
    const restaurant = await this.resRepository.find({
      relations:{
        user:true,
        vc:true,
        prod:true 
      },
      where: [{user}]
    })
    return restaurant

  }

  // async findAll():Promise<Restaurant[]> {
  //   return await this.resRepository.find({relations:['users']});
  // }

  async getAllByID(id: number): Promise<Restaurant> {
    return await this.resRepository.findOne({
      relations: [ 'vc', "prod"],
      where: [{
        id: id
      }]
    });
  }


  async update(id:number ,userId: number, updateRestaurantDto: UpdateRestaurantDto): Promise<UpdateResult> {
    let user = await (await this.userRepository.findOneBy({ id: userId }))
    delete user.username
    delete user.password
    delete user.phone
    delete user.email
    delete user.avata
    delete user.role
    delete user.address
    console.log(user);


    if (!user) {
      throw new HttpException('Not found UserId', HttpStatus.BAD_REQUEST);
    }
    const newRes = this.resRepository.create({
      ...updateRestaurantDto,
      user

    });
    return await this.resRepository.update(id, updateRestaurantDto);

  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.resRepository.delete(id);

  }
}
