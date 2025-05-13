import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Use } from "./use.entity";
import { UseCompositionUseFor } from "./use-composition-use-for.entity";

@Entity('use_compositions')
export class UseComposition {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Use, (use) => use.id, { nullable: true })
    @JoinColumn({ name: 'use_id', referencedColumnName: 'id' })
    use: Use;

    @Column({ name: 'use_id', type: 'int', nullable: true })
    useId: number;

    @Column({ name: 'title_id', type: 'varchar', length: 255, nullable: true, })
    titleIDN: string;

    @Column({ name: 'title_eng', type: 'varchar', length: 255, nullable: true, })
    titleENG: string;

    @Column({ name: 'description_id', type: 'text', nullable: true, })
    descriptionIDN: string;

    @Column({ name: 'description_eng', type: 'text', nullable: true, })
    descriptionENG: string;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;

    @OneToMany(() => UseCompositionUseFor, (useCompositionUseFor) => useCompositionUseFor.useComposition)
    useCompositionUseFor: UseCompositionUseFor[];

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