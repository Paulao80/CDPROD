import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1632924510229 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Users",
            columns: [
                {
                    name: 'UserId',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'Name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'User',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'Email',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'Password',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'FotoPath',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'CreatedAt',
                    type: 'text',
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Users');
    }

}
