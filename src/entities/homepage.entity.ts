import { ContentType } from "src/types/homepage.type";
import { LanguageType } from "src/types/languange.type";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'homepages' })
export class Homepage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'language', type: 'varchar', length: 50, nullable: true })
    language: LanguageType;

    @Column({ name: 'key', type: 'varchar', length: 50, nullable: true })
    key: string;

    @Column({ name: 'content_type', type: 'varchar', length: 50, nullable: true })
    contentType: ContentType;

    @Column({ name: 'content', type: 'text', nullable: true })
    content: string;

    fileUrl?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;
}