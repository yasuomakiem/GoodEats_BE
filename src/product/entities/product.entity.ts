/* eslint-disable prettier/prettier */
import { Card } from 'src/card/entity/card.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'product',
})
export class Product {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'float',
    name: 'price',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'float',
    name: 'sale_price',
    nullable: true,
    default: 0,
  })
  sale_price: number;
  
  @Column({
    type: 'text',
    name: 'image',
    nullable: false,
  })
  image: string;

  @Column({
    type: 'varchar',    
  })
  status: string;
  @Column({
    type: 'text',
    name: 'description',

  })


  @OneToMany(() => OrderDetail, (orddt) => orddt.prod)
  orddt: OrderDetail[]
  @OneToMany(() => Card, (card) => card.prod)
  card: Card[]

  
  @ManyToOne(() => Restaurant, (res) => res.prod)
  res: Restaurant;

  
 

  
}