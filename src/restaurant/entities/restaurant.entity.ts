import { UserEntity as User} from 'src/user/user.entiy/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import {Voucher} from 'src/voucher/entities/voucher.entity'
@Entity({
  name: 'restaurant',
})
export class Restaurant {
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
        length: 100,
        unique: true
    })
    address: string;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 11,
        unique: true
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    avata: string

    @ManyToOne(() => User, (user) => user.rest)
    user: User;

    @OneToMany(() => Voucher, (voucher) => voucher.res)
    vc: Voucher[]

}