import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUseCompositionTables1747056226096 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS use_compositions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            use_id INT,
            hero_image VARCHAR(255),
            title_id VARCHAR(255),
            title_eng VARCHAR(255),
            description_id TEXT,
            description_eng TEXT,
            deleted_at TIMESTAMP NULL DEFAULT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_use FOREIGN KEY (use_id) REFERENCES uses(id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS use_compositions`);
    }
}
