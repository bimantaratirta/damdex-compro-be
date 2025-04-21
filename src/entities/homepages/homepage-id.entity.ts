import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'homepages_id' })
export class HomepageIdn {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'key', type: 'varchar', length: 50, nullable: true })
    key: string;

    @Column({ name: 'title', type: 'varchar', length: 255, nullable: true })
    title: string;

    @Column({ name: 'content', type: 'text', nullable: true })
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;
}