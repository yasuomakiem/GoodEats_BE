import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { UserEntity } from "src/user/user.entiy/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'cart'
})
export class Card {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;


    @Column({
        type: 'varchar',

    })
    quantity: string    

    


    @ManyToOne(()=> Product,(prod)=> prod.card)
    prod: Product  

    @ManyToOne(()=> UserEntity,(user)=> user.card)
    user: UserEntity;

    @ManyToOne(()=> Restaurant,(res)=> res.cart)
    res: Restaurant;
    
}
