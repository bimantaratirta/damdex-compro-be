import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStoreTable1749565619649 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE stores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                province VARCHAR(255),
                city VARCHAR(255),
                store_name VARCHAR(255),
                store_address VARCHAR(255),
                store_address_google_map VARCHAR(255),
                store_phone VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL DEFAULT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS stores`);
    }

}
