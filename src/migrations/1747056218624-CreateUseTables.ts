import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUseTables1747056218624 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS uses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            hero_image VARCHAR(255),
            title_id VARCHAR(255),
            title_eng VARCHAR(255),
            deleted_at TIMESTAMP NULL DEFAULT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS uses`);
    }
}
