import {TipoPessoa} from '../enums/TipoPessoaEnum';
import {EstadoCivil} from '../enums/EstadoCivilEnum';
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import ContaBancaria from './ContaBancaria';
import Propriedade from './Propriedade';

@Entity('Produtores')
export default class Produtor{
    @PrimaryGeneratedColumn('increment')
    ProdutorId: number;

    @Column()
    Nome: string;

    @Column()
    DataNasc: string;

    @Column({type: 'integer'})
    TipoPessoa: TipoPessoa;

    @Column()
    Nacionalidade: string;

    @Column()
    CpfCnpj: string;

    @Column()
    RG: string;

    @Column()
    OrgaoExp: string;

    @Column()
    EstadoExp: string;

    @Column()
    DataExp: string;

    @Column({type: 'integer'})
    EstadoCivil: EstadoCivil;

    @Column()
    Telefone: string;

    @Column()
    UltLaticinio: string;

    @OneToMany(() => ContaBancaria, conta => conta.Produtor, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'ProdutorId'})
    ContasBancarias: ContaBancaria[];

    @OneToMany(() => Propriedade, propriedade => propriedade.Produtor, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'ProdutorId'})
    Propriedades: Propriedade[];
}