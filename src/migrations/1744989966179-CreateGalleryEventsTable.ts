import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGalleryEventsTable1744989966179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS gallery_events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            image VARCHAR(255),
            deleted_at TIMESTAMP NULL DEFAULT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
