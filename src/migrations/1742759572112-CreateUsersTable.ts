import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1742759572112 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                username VARCHAR(255),
                email VARCHAR(255),
                password VARCHAR(255),
                deleted_at TIMESTAMP NULL DEFAULT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
