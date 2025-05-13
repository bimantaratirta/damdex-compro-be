import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUseCompositionUseForTables1747056256456 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS use_composition_use_fors (
            id INT AUTO_INCREMENT PRIMARY KEY,
            use_composition_id INT,
            title_id VARCHAR(255),
            title_eng VARCHAR(255),
            description_id TEXT,
            description_eng TEXT,
            deleted_at TIMESTAMP NULL DEFAULT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_use_composition FOREIGN KEY (use_composition_id) REFERENCES use_compositions(id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS use_composition_use_fors`);
    }

}
