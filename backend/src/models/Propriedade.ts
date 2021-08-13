import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Produtor from './Produtor';

@Entity('Propriedades')
export default class Propriedade{
    @PrimaryGeneratedColumn('increment')
    PropriedadeId: number;

    @Column()
    Nirf: string;

    @Column()
    Nome: string;

    @Column()
    InscEstadual: string;

    @Column()
    Endereco: string;

    @Column()
    Municipio: string;

    @Column()
    Estado: string;

    @ManyToOne(() => Produtor, produtor => produtor.Propriedades)
    @JoinColumn({name: 'ProdutorId'})
    Produtor: Produtor;
}