import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from 'src/user/user.entiy/user.entity';
import { Voucher } from 'src/voucher/entities/voucher.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,

    @InjectRepository(Restaurant)
    private readonly resRepository: Repository<Restaurant>

  ) { }
  async create(userId: number,resId:number, createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepository.findOneBy({ id: userId })
    delete user.password
    delete user.address
    delete user.email
    delete user.phone
    delete user.address
    delete user.avata
    delete user.ord
    delete user.rest
    delete user.role
    if (!user) {
      throw new HttpException('Not found User', HttpStatus.BAD_REQUEST);
    }
    const res = await this.resRepository.findOneBy({ id: resId })

    // const vou = await this.voucherRepository.findOneBy({ id: voucherId })
    // if (!vou) {
    //   throw new HttpException('Not found Voucher', HttpStatus.BAD_REQUEST);
    // }
    const newOrder = this.orderRepository.create({
      ...createOrderDto,
      user,
      res
      // vou
    })

    return this.orderRepository.save(newOrder);
  }

  async update(id: number, userId: number,resId:number, updateOrderDto: UpdateOrderDto): Promise<UpdateResult> {
    const user = await this.userRepository.findOneBy({ id: userId })
    delete user.password
    delete user.address
    delete user.email
    delete user.phone
    delete user.address
    delete user.avata
    delete user.ord
    delete user.rest
    delete user.role
    if (!user) {
      throw new HttpException('Not found UserId', HttpStatus.BAD_REQUEST);
    }
    // const vou = await this.voucherRepository.findOneBy({ id: voucherId })
    // if (!vou) {
    //   throw new HttpException('Not found Voucher', HttpStatus.BAD_REQUEST);
    // }
    const res = await this.userRepository.findOneBy({ id: resId })

    const newOrder = this.orderRepository.create({
      ...updateOrderDto,
      user,
      res
      // vou
    })
    return this.orderRepository.update(id, newOrder);
  }

  async getAllOrder():Promise<Order[]>{
    return this.orderRepository.find({ relations: {
      
      res:true,
    

      // orddt:true

    }})
  }

  async getByUserId(userId: number): Promise<Order[]> {
    const user = await this.userRepository.findOne({
      where: [{ id: userId }],
    });
    
    const orders = await this.orderRepository.find({
      relations: {
        user: true,
        // vou:true,
        // orddt:true

      },
      where: [{ user }]
    });
    
    // console.log(orders);
    return orders;

  }

  async getOrder(id:number):Promise<Order[]>{
    return await this.orderRepository.find({
      relations:{
        orddt:true,
        res:true,
        user:true        
        },
      where: {id: id}}  )

  }
    async getByResId(resId:number):Promise<Order[]>{
      const res = await this.resRepository.findOne({ where:[{id: resId}]})

      const orders = await this.orderRepository.find({
        relations: {
          user: true,
          res:true,
        // vou:true,

          // orddt:true
  
        },
        where: [{ res }]

      })
    return orders;

    }
    


  async remove(id: number): Promise<DeleteResult> {
    return await this.orderRepository.delete(id);
  }
}
