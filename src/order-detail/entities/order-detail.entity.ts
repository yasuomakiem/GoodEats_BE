import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'order_detail'
})
export class OrderDetail {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        type: 'varchar',

    })
    quantity: string
    // @Column({
    //     type: 'varchar',

    // })
    // price: string

    @ManyToOne(()=> Product,(prod)=> prod.orddt)
    prod: Product

    @ManyToOne(()=> Order,(ord)=> ord.orddt)
    ord: Order;

    
}
