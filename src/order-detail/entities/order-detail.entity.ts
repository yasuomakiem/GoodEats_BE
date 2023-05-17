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
        type: 'int'
    })
    quantity: number
    @Column({
        type: 'float'
    })
    price: number

    @ManyToOne(()=> Product,(prod)=> prod.orddt)
    prod: Product

    @ManyToOne(()=> Order,(ord)=> ord.orddt)
    ord: Order;

    
}
