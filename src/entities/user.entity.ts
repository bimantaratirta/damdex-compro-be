import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: true })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: true })
  lastName: string;

  @Column({ name: 'username', type: 'varchar', length: 255, nullable: true })
  username: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: true })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
