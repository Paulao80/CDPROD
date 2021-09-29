import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Users')
export default class User{
    @PrimaryGeneratedColumn('increment')
    UserId: number;

    @Column()
    Name: string;

    @Column()
    User: string;

    @Column()
    Email: string;

    @Column()
    Password: string;

    @Column()
    FotoPath: string;

    @Column()
    CreatedAt: string;
}