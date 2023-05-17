import { Order } from 'src/order/entities/order.entity';
import {Restaurant} from 'src/restaurant/entities/restaurant.entity'
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';

@Entity({
  name: 'voucher',
})
export class Voucher{
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true
    })
    name: string;   

    @Column({
        type: 'varchar',
        length: 11,
        unique: true
    })
    discout: number;
  

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.vc)
    res: Restaurant;

    @OneToMany(()=>Order, (ord) => ord.vou)
    ord: Order

}
