import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { Repository } from 'typeorm';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
      private readonly vouRepository: Repository<Voucher>,

    @InjectRepository(Restaurant)
      private readonly resRepository: Repository<Restaurant>,
  ){}

  // queryBuilder(query: string) {
  //   return this.resRepository.createQueryBuilder(query);
  // }
    
  async create(resId:number,createVoucherDto: CreateVoucherDto):Promise<Voucher> {
    const res = await  this.resRepository.findOneBy({id:resId})
    if(!res){
      throw new HttpException('Not found Restaurant Id',HttpStatus.BAD_REQUEST);

    }
    const newVou = this.vouRepository.create({
      ...createVoucherDto,
      res,
    })
    return this.vouRepository.save(newVou);
  }

  // getByResID(resId: number): Promise<Voucher[]> {
  //   const res = this.vouRepository.findOne({
  //     where: [{ id: resId }],
  //   });
  //   return this.vouRepository.find({
  //     relations: ['res'],
  //     where: [{ res:res[0]}],
  //   });
  // }

  

  remove(id: number) {
    return this.vouRepository.delete(id);
  }
}
