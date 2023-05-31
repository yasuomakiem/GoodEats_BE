import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./entity/card.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Product } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/user.entiy/user.entity";
import { CreateCardlDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";

@Injectable()
export class CardService{
    constructor(
        @InjectRepository(Card)
        private readonly cardRespository: Repository<Card>,
    
        @InjectRepository(Product)
        private readonly productRespository: Repository<Product>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(Restaurant)
        private readonly resRepository: Repository<Restaurant>,
        
    ){}

    queryBuilder(query: string) {
      return this.cardRespository.createQueryBuilder(query);
    }
  
   

    async create(prodId:number,userId:number,resId:number,data: CreateCardlDto) {
        const  prod = await this.productRespository.findOneBy({id:prodId})
        if (!prod) {
          throw new HttpException('Not found Product', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userRepository.findOneBy({ id: userId })
        
        if (!user) {
          throw new HttpException('Not found Order', HttpStatus.BAD_REQUEST);
        }
        delete user.password,
        delete user.phone
        delete user.email
        const  res = await this.resRepository.findOneBy({id:resId})
        if (!res) {
          throw new HttpException('Not found Restuarant', HttpStatus.BAD_REQUEST);
        }
        const newCard = this.cardRespository.create({
          ...data,
          prod,
          user,
          res
        })
       
        console.log(newCard);
        
        return this.cardRespository.save(newCard);
      }

      async update(id: number,prodId:number,userId:number,resId:number, updateData: UpdateCardDto):Promise<UpdateResult>{
        const  prod = await this.productRespository.findOneBy({id:prodId})
        if (!prod) {
          throw new HttpException('Not found Product', HttpStatus.BAD_REQUEST);
        }
        // delete prod.image
        const user = await this.userRepository.findOneBy({ id: userId })
        
        if (!user) {
          throw new HttpException('Not found Order', HttpStatus.BAD_REQUEST);
        }
        delete user.password,
        delete user.phone
        delete user.email
        const  res = await this.resRepository.findOneBy({id:resId})
        if (!res) {
          throw new HttpException('Not found Restuarant', HttpStatus.BAD_REQUEST);
        }
        const updateCard = this.cardRespository.create({
          ...updateData,
          prod,
          user,
          res
        })
        return this.cardRespository.update(id,updateCard);
      }

      async getByUserId(userId:number):Promise<Card[]>{
        const user = await this.userRepository.findOne({where: {id: userId} })
        // const prod = await this.orderRepository.findOne({where: {id: orderId} })
    
        const card = await this.cardRespository.find({
          relations:{            
            prod:true,
            res:true
            
           
            // user:true
            
        
          },
          where: [{user},]
          
        });

        return card;
    
    
      }
      async getByResId(userId:number,resId:number):Promise<Card[]>{
        const res = await this.resRepository.findOne({where:{id:resId}})
        const user = await this.resRepository.findOne({where:{id:userId}})
        const card = await this.cardRespository.find({
          relations:{            
            prod:true,
            res:true
            
           
            // user:true
            
        
          },
          where: [{user},{res},]

        })
        return card;
      }

      async deleteProduct(id:number):Promise<DeleteResult>{
        return await this.cardRespository.delete(id)
      }
     
}