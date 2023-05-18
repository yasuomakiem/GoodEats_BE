import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { UserEntity } from "src/user/user.entiy/user.entity";
import { Voucher } from "src/voucher/entities/voucher.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'order'})
export class Order {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    delivered_address:string;

    @Column({
        type: 'varchar',
        length:11
    })
    delivered_phone:string;
    
    @Column({
        type: 'varchar',
        length:20
    })
    status: string;

    @ManyToOne(()=> Voucher, (vou) => vou.ord)
    vou: Voucher;

    @ManyToOne(()=> UserEntity, (user)=> user.ord)
    user: UserEntity;

    @OneToMany(()=> OrderDetail, (orddt)=> orddt.ord)
    orddt: OrderDetail[];
    
}   
