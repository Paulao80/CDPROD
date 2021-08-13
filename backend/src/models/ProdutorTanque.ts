import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Produtor from './Produtor';
import Tanque from './Tanque';

@Entity('ProdutoresTanques')
export default class ProdutorTanque{
    @PrimaryGeneratedColumn('increment')
    ProdutorTanqueId: number;

    @Column()
    Responsavel: boolean;

    @ManyToOne(() => Produtor, produtor => produtor.ProdutoresTanques)
    @JoinColumn({name: 'ProdutorId'})
    Produtor: Produtor;

    @ManyToOne(() => Tanque, tanque => tanque.ProdutoresTanques)
    @JoinColumn({name: 'TanqueId'})
    Tanque: Tanque;
}