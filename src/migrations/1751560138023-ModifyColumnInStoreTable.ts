import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyColumnInStoreTable1751560138023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE stores
            MODIFY COLUMN store_address_google_map TEXT;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE stores
            MODIFY COLUMN store_address_google_map VARCHAR(255);
        `);
    }

}
