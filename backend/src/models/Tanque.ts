import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import { TipoTanque } from '../enums/TipoTanqueEnum';
import ProdutorTanque from './ProdutorTanque';

@Entity('Tanques')
export default class Tanque{
    @PrimaryGeneratedColumn('increment')
    TanqueId: number;

    @Column()
    Rota: string;

    @Column()
    Capacidade: number;

    @Column()
    MediaDiaria: number;

    @Column({type: 'integer'})
    TipoTanque: TipoTanque;

    @Column()
    FotoPath: string;

    @Column()
    NumeroSerie: string;

    @Column()
    Marca: string;

    @Column()
    Latitude: number;
    
    @Column()
    Longitude: number;

    @OneToMany(() => ProdutorTanque, prodTanque => prodTanque.Tanque, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'TanqueId'})
    ProdutoresTanques: ProdutorTanque[];
}