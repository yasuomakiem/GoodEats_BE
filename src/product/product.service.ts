import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
   
  ) {}

  queryBuilder(query: string) {
    return this.productRepository.createQueryBuilder(query);
  }

  

  getByID(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: [{ id: id }],
    });
  }

  async create(resId: number, prod:CreateProductDto): Promise<Product> {
    let res = await this.restaurantRepository.findOneBy({ id: resId });
    if (!res) {
      throw new HttpException('Restaurant Id not found', HttpStatus.BAD_REQUEST);
    }
    const newProd = this.productRepository.create({
      ...prod,
      res
    }
      

    )

    return this.productRepository.save(newProd);
  }

  async update(
    id: number,
    resId: number,
    prod: UpdateProductDto,
  ): Promise<UpdateResult> {
    const res = await this.restaurantRepository.findOneBy({ id: resId });
    if (!res) {
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    }
    const newProd = this.productRepository.create({
      ...prod,
      res,
    });
    return this.productRepository.update(id, newProd);
  }

  async deleteData(id: number): Promise<DeleteResult> {
    const prod = await this.productRepository.find({
      where: [{ id: id }],
    });    
    return this.productRepository.delete(id);
  }

  

  

 

 
}
