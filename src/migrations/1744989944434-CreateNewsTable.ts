import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewsTable1744989944434 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS news (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            image_title VARCHAR(255),
            content TEXT,
            deleted_at TIMESTAMP NULL DEFAULT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
