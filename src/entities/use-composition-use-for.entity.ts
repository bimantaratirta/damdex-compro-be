import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UseComposition } from "./use-composition.entity";

@Entity('use_composition_use_fors')
export class UseCompositionUseFor {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => UseComposition, (useComposition) => useComposition.id, { nullable: true })
    @JoinColumn({ name: 'use_composition_id', referencedColumnName: 'id' })
    useComposition: UseComposition;

    @Column({ name: 'use_composition_id', type: 'int', nullable: true })
    useCompositionId: string;

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
}