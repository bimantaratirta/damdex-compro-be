import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1745944164939 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            hero_image VARCHAR(255),
            title_id VARCHAR(255),
            title_eng VARCHAR(255),
            description_id TEXT,
            description_eng TEXT,
            deleted_at TIMESTAMP NULL DEFAULT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
            )
        `)
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS product_advantages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id INT,
            hero_image VARCHAR(255),
            title_id VARCHAR(255),
            title_eng VARCHAR(255),
            description_id TEXT,
            description_eng TEXT,
            deleted_at TIMESTAMP NULL DEFAULT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id)
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS product_advantages`);
        await queryRunner.query(`DROP TABLE IF EXISTS products`);
    }
}
