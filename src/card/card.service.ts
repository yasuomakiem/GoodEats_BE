import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./entity/card.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Product } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/user.entiy/user.entity";
import { CreateCardlDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Injectable()
export class CardService{
    constructor(
        @InjectRepository(Card)
        private readonly cardRespository: Repository<Card>,
    
        @InjectRepository(Product)
        private readonly productRespository: Repository<Product>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}


    async create(prodId:number,userId:number,data: CreateCardlDto) {
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
        const newCard = this.cardRespository.create({
          ...data,
          prod,
          user
        })
        console.log(newCard);
        
        return this.cardRespository.save(newCard);
      }

      async update(id: number,prodId:number,userId:number, updateData: UpdateCardDto):Promise<UpdateResult>{
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
        const updateCard = this.cardRespository.create({
          ...updateData,
          prod,
          user
        })
        return this.cardRespository.update(id,updateCard);
      }

      async getByUserId(userId:number):Promise<Card[]>{
        const user = await this.userRepository.findOne({where: {id: userId} })
        // const prod = await this.orderRepository.findOne({where: {id: orderId} })
    
        const card = await this.cardRespository.find({
          relations:{            
            prod:true,
            // user:true
        
          },
          where: [{user},]
        });
        return card;
    
    
      }

      async deleteProduct(id:number):Promise<DeleteResult>{
        return await this.cardRespository.delete(id)
      }
    
}