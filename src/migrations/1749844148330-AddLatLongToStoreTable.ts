import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLatLongToStoreTable1749844148330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE stores
            ADD COLUMN latitude VARCHAR(255) AFTER store_phone,
            ADD COLUMN longitude VARCHAR(255) AFTER latitude
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE stores
            DROP COLUMN latitude,
            DROP COLUMN longitude
        `);
    }

}
