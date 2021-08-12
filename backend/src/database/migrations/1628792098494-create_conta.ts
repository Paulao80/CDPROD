import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createConta1628792098494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'ContasBancarias',
            columns: [
                {
                    name: 'ContaId',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'NomePertence',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'Banco',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'Agencia',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'Conta',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'ProdutorId',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'ProdutorId',
                    columnNames: ['ProdutorId'],
                    referencedTableName: 'Produtores',
                    referencedColumnNames: ['ProdutorId'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }           
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ContasBancarias');
    }

}
