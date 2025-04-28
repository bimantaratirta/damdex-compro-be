import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGalleryEventsTable1744989966179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS gallery_events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            hero_image VARCHAR(255),
            event_date TIMESTAMP NULL,
            title_id VARCHAR(255),
            event_venue_id VARCHAR(255),
            event_theme_id VARCHAR(255),
            event_description_id TEXT,
            title_eng VARCHAR(255),
            event_venue_eng VARCHAR(255),
            event_theme_eng VARCHAR(255),
            event_description_eng TEXT,
            deleted_at TIMESTAMP NULL DEFAULT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS news`);
  }
}
