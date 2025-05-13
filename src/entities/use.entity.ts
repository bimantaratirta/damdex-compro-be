import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UseComposition } from "./use-composition.entity";

@Entity('uses')
export class Use {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'hero_image', type: 'varchar', length: 255, nullable: true, })
    heroImage: string;

    @Column({ name: 'title_id', type: 'varchar', length: 255, nullable: true, })
    titleIDN: string;

    @Column({ name: 'title_eng', type: 'varchar', length: 255, nullable: true, })
    titleENG: string;

    heroImageUrl?: string;

    @OneToMany(() => UseComposition, (useComposition) => useComposition.use)
    useComposition: UseComposition[];
    
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