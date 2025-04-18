import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHomepagesTable1744734664951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS homepages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                \`key\` VARCHAR(50),
                title VARCHAR(255),
                content TEXT,
                deleted_at TIMESTAMP NULL DEFAULT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS homepages`);
  }
}
