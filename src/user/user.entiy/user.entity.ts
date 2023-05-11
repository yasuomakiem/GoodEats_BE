import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'user'})
export class UserEntity{
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
    username: string;
    
    @Column({
        type: 'varchar',
        length: 100,
      
    })
    password: string;
    
    @Column({
        type: 'varchar',
        length: 11,
        unique: true
    })
    phone: string;

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
    avata: string;

    @Column({
        type: 'varchar',
        length: 11,
        
    })
    role: string;
}