import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1779287341415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users(
                id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(256) NOT NULL,
                email VARCHAR(256) UNIQUE NOT NULL,
                password VARCHAR(256) NOT NULL,
                created_at TIMESTAMPTZ NULL,
                updated_at TIMESTAMPTZ NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS user;`);
    }

}
