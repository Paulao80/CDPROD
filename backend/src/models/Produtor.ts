import {TipoPessoa} from './enums/TipoPessoaEnum';
import {EstadoCivil} from './enums/EstadoCivilEnum';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('Produtores')
export default class Produtor{
    @PrimaryGeneratedColumn('increment')
    ProdutorId: number;

    @Column()
    Nome: string;

    @Column()
    DataNasc: string;

    @Column()
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

    @Column()
    EstadoCivil: EstadoCivil;

    @Column()
    Telefone: string;

    @Column()
    UltLaticinio: string;
}