import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'projects' })
export class Project {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'hero_image', type: 'varchar', length: 255, nullable: true, })
    heroImage: string;

    @Column({ name: 'title_id', type: 'varchar', length: 255, nullable: true, })
    titleIDN: string;

    @Column({ name: 'first_description_id', type: 'text', nullable: true, })
    firstDescriptionIDN: string;

    @Column({ name: 'second_description_id', type: 'text', nullable: true, })
    secondDescriptionIDN: string;

    @Column({ name: 'title_eng', type: 'varchar', length: 255, nullable: true, })
    titleENG: string;

    @Column({ name: 'first_description_eng', type: 'text', nullable: true, })
    firstDescriptionENG: string;

    @Column({ name: 'second_description_eng', type: 'text', nullable: true, })
    secondDescriptionENG: string;

    heroImageUrl?: string;
    
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