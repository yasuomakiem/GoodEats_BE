import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';
import { Request } from 'express';


@Controller('api/voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) { }
  private logger = new Logger();

  isNum = (data: any) => {
    return typeof data == 'number';
  };

  @Post('add/:resId')
  create(
    @Param('resId') resId: number,
    @Body() createVoucherDto: CreateVoucherDto): Promise<Voucher> {
    return this.voucherService.create(resId, createVoucherDto);
  }

  @Get(':resId')
  getByResId(@Param('resId') resId: number): Promise<Voucher[]> {
    return this.voucherService.getByResId(resId);
  }

  


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherService.remove(+id);
  }
}
