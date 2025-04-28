import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'news' })
export class News {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'title_image', type: 'varchar', length: 255, nullable: true, })
    titleImage: string;

    @Column({ name: 'title_id', type: 'varchar', length: 255, nullable: true, })
    titleIDN: string;

    @Column({ name: 'content_id', type: 'text', nullable: true, })
    contentIDN: string;

    @Column({ name: 'title_eng', type: 'varchar', length: 255, nullable: true, })
    titleENG: string;

    @Column({ name: 'content_eng', type: 'text', nullable: true, })
    contentENG: string;

    titleImageUrl?: string;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;

    public getSearchables() {
        return {
          titleIDN: 'LIKE',
          titleENG: 'LIKE',
        };
    }

    
    public getDefaultOrderBy() {
      return {
        columnName: 'createdAt',
        order: 'desc',
      };
    }
}