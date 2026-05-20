import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskTable1779287329189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE task(
                id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                title VARCHAR(256) NOT NULL,
                description VARCHAR(512) NULL,
                status VARCHAR(50) NOT NULL DEFAULT 'TO_DO',
                expiration_date TIMESTAMPTZ NOT NULL,
                created_at TIMESTAMPTZ NULL,
                updated_at TIMESTAMPTZ NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS task;`);
    }
}
