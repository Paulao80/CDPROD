import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProdutor1628708830751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Produtores',
            columns: [
                {
                    name: 'ProdutorId',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'Nome',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'DataNasc',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'TipoPessoa',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'Nacionalidade',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'CpfCnpj',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'rg',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'OrgaoExp',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'EstadoExp',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'DataExp',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'EstadoCivil',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'Telefone',
                    type: 'varchar',
                    isNullable: true               
                },
                {
                    name: 'UltLaticinio',
                    type: 'varchar',
                    isNullable: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Produtores');
    }

}
