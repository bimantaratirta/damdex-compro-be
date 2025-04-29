import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductAdvantage } from "./product-advantage.entity";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'hero_image', type: 'varchar', length: 255, nullable: true, })
    heroImage: string;

    @Column({ name: 'title_id', type: 'varchar', length: 255, nullable: true, })
    titleIDN: string;

    @Column({ name: 'description_id', type: 'text', nullable: true, })
    descriptionIDN: string;

    @Column({ name: 'title_eng', type: 'varchar', length: 255, nullable: true, })
    titleENG: string;

    @Column({ name: 'description_eng', type: 'text', nullable: true, })
    descriptionENG: string;

    heroImageUrl?: string;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;

    @OneToMany(() => ProductAdvantage, (productAdvantage) => productAdvantage.product)
    productAdvantage: ProductAdvantage[];

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