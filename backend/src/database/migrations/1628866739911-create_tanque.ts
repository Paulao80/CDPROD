import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTanque1628866739911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Tanques',
            columns: [
                {
                    name: 'TanqueId',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'Rota',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'Capacidade',
                    type: 'real',
                    isNullable: false
                },
                {
                    name: 'MediaDiaria',
                    type: 'real',
                    isNullable: false
                },
                {
                    name: 'TipoTanque',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'FotoPath',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'NumeroSerie',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'Marca',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'Latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                    isNullable: false
                },
                {
                    name: 'Longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                    isNullable: false
                }       
            ]
        }));
        await queryRunner.createTable(new Table({
            name: 'ProdutoresTanques',
            columns: [
                {
                    name: 'ProdutorTanqueId',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'ProdutorId',
                    type: 'integer'
                },
                {
                    name: 'TanqueId',
                    type: 'integer'
                },
                {
                    name: 'Responsavel',
                    type: 'boolean'
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
                },
                {
                    name: 'TanqueId',
                    columnNames: ['TanqueId'],
                    referencedTableName: 'Tanques',
                    referencedColumnNames: ['TanqueId'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }  
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Tanques');
        await queryRunner.dropTable('ProdutoresTanques');
    }

}
