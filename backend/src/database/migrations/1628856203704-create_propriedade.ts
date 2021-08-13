import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPropriedade1628856203704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Propriedades',
            columns: [
                {
                    name: 'PropriedadeId',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'Nirf',
                    type: 'varchar'
                },
                {
                    name: 'Nome',
                    type: 'varchar'
                },
                {
                    name: 'InscEstadual',
                    type: 'varchar'
                },
                {
                    name: 'Endereco',
                    type: 'text'
                },
                {
                    name: 'Municipio',
                    type: 'varchar'
                },
                {
                    name: 'Estado',
                    type: 'varchar'
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
        await queryRunner.dropTable('Propriedades');
    }

}
