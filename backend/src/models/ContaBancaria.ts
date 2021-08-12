import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Produtor from './Produtor';

@Entity('ContasBancarias')
export default class ContaBancaria{
    @PrimaryGeneratedColumn('increment')
    ContaId: number;

    @Column()
    NomePertence: string;

    @Column()
    Banco: string;

    @Column()
    Agencia: string;

    @Column()
    Conta: string;

    @ManyToOne(() => Produtor, produtor => produtor.ContasBancarias)
    @JoinColumn({name: 'ProdutorId'})
    Produtor: Produtor;
}