import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from 'src/user/user.entiy/user.entity';
import { Voucher } from 'src/voucher/entities/voucher.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>
  ) { }
  async create(userId: number, voucherId: number, createOrderDto: CreateOrderDto): Promise<Order> {
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
    const vou = await this.voucherRepository.findOneBy({ id: voucherId })
    if (!vou) {
      throw new HttpException('Not found Voucher', HttpStatus.BAD_REQUEST);
    }
    const newOrder = this.orderRepository.create({
      ...createOrderDto,
      user,
      vou
    })

    return this.orderRepository.save(newOrder);
  }

  async update(id: number, userId: number, voucherId: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResult> {
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
    const vou = await this.voucherRepository.findOneBy({ id: voucherId })
    if (!vou) {
      throw new HttpException('Not found Voucher', HttpStatus.BAD_REQUEST);
    }
    const newOrder = this.orderRepository.create({
      ...CreateOrderDto,
      user,
      vou
    })
    return this.orderRepository.update(id, newOrder);
  }

  async getByUserId(userId: number): Promise<Order[]> {
    const user = await this.userRepository.findOne({
      where: [{ id: userId }],
    });
    
    const orders = await this.orderRepository.find({
      relations: {
        user: true
      },
      where: [{ user }]
    });
    
    // console.log(orders);
    return orders;

  }


  async remove(id: number): Promise<DeleteResult> {
    return await this.orderRepository.delete(id);
  }
}
