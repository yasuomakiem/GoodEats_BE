import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Request } from 'express';
import { async } from 'rxjs';
import { AuthGuard } from '@nestjs/passport'; 


// @UseGuards(AuthGuard('jwt'))
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  private logger = new Logger();
  isNum = (data: any) => {
    return typeof data == 'number';
  };

  @Get()
  async getAll(@Req() req: Request): Promise<Product[]> {
    const builder = this.productService
      .queryBuilder('product')
      .innerJoinAndSelect('product.res', 'res');
    // this.logger.log(builder.getQuery());


    if (req.query.name) {
      builder.andWhere(`product.name LIKE '%${req.query.name}%'`);
      this.logger.log(builder.getQuery());
    }

    if (req.query.sort) {
      const sort = req.query.sort;
      const sortArr = sort.toString().split('-');
      builder.orderBy(
        `product.${sortArr[0]}`,
        sortArr[1] == 'ASC' ? 'ASC' : 'DESC',
      );
      // this.logger.log(builder.getQuery());
    }
    if (req.query.status || this.isNum(req.query.status)) {
      const status = req.query.status;
      builder.andWhere(`product.status != 'delete'`);

      // this.logger.log(builder.getQuery());
    }

    if (req.query.res || this.isNum(req.query.res)) {
      const resId = req.query.res;
      builder.andWhere(`res.id = ${resId}`);
      // this.logger.log(builder.getQuery());
    }

    if (req.query.price) {
      const priceSort = req.query.price;
      const priceArr = priceSort.toString().split('-');
      const start = priceArr[0] ? priceArr[0] : 0;
      const end = priceArr[1] ? priceArr[1] : 100000000;
      builder.andWhere(`product.price BETWEEN ${start} AND ${end}`);
      // this.logger.log(builder.getQuery());
    }

    if (req.query.minPrice || req.query.maxPrice) {
      const minPrice = req.query.minPrice ? req.query.minPrice : 0;
      const maxPrice = req.query.maxPrice ? req.query.maxPrice : 100000000;
      builder.where(`product.price BETWEEN ${minPrice} AND ${maxPrice}`);
      // this.logger.log(builder.getQuery());
    }
    if (req.query.page || this.isNum(req.query.page)) {
      const page =  parseInt(req.query.page as any) || 1
      const perPage: number = parseInt(req.query.limit as any) || 6;

      builder.offset((page - 1) * perPage).limit(perPage);
      // this.logger.log(builder.getQuery());
    }


    // this.logger.log(builder.getQuery());
    builder.andWhere(`product.status != 'delete'`);

    return await builder.getMany();
  }
  // @Post('resId')
  // async create(@Param('resId') resId: number,@Body() createProductDto: CreateProductDto):Promise<Product[]>{
  //   return await this.productService.create(resId,createProductDto);
  // }

  

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.getByID(id);
  }
  @Post(':resId')
  async addProduct(
    @Param('resId') resId: number,
    @Body() creatProduct: CreateProductDto){
      return await this.productService.create(resId,creatProduct)
    }

  


  @Patch(':id/:resId')
  async update(@Param('id') id: number,
  @Param('resId') resId: number,
  @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(id,resId, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.deleteData(id);
  }
}
