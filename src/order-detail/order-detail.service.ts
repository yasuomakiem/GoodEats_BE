import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRespository: Repository<OrderDetail>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ){}
  async create(prodId:number,orderId:number,createOrderDetailDto: CreateOrderDetailDto) {
    const  prod = await this.productRepository.findOneBy({id:prodId})
    if (!prod) {
      throw new HttpException('Not found Product', HttpStatus.BAD_REQUEST);
    }
    delete prod.image
    delete prod.description
    const ord = await this.orderRepository.findOneBy({ id: orderId })
    if (!ord) {
      throw new HttpException('Not found Order', HttpStatus.BAD_REQUEST);
    }
    const newOrderDetail = this.orderDetailRespository.create({
      ...createOrderDetailDto,
      prod,
      ord
    })
    console.log(newOrderDetail);
    
    return this.orderDetailRespository.save(newOrderDetail);
  }

  async update(id: number,productId:number,orderId:number, updateOrderDetailDto: UpdateOrderDetailDto):Promise<UpdateResult>{
    const  prod = await this.productRepository.findOneBy({id:productId})
    if (!prod) {
      throw new HttpException('Not found Product', HttpStatus.BAD_REQUEST);
    }
    delete prod.image
    delete prod.description
    const ord = await this.orderRepository.findOneBy({ id: orderId })
    if (!ord) {
      throw new HttpException('Not found Order', HttpStatus.BAD_REQUEST);
    }
    const newOrderDetail = this.orderDetailRespository.create({
      ...updateOrderDetailDto,
      prod,
      ord
    })
    return this.orderDetailRespository.update(id,newOrderDetail);
  }

  async getByOrderId(orderId:number):Promise<OrderDetail[]>{
    const ord = await this.orderRepository.findOne({where: {id: orderId} })
    // const prod = await this.orderRepository.findOne({where: {id: orderId} })

    const ordt = await this.orderDetailRespository.find({
      relations:{
        ord:true,
        prod:true
    
      },
      where: [{ord},]
    });
    return ordt;


  }

  findAll() {
    return `This action returns all orderDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
