import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'stores' })
export class Store {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'province', type: 'varchar', length: 255, nullable: true })
    province: string;

    @Column({ name: 'city', type: 'varchar', length: 255, nullable: true })
    city: string;

    @Column({ name: 'store_name', type: 'varchar', length: 255, nullable: true })
    storeName: string;

    @Column({ name: 'store_address', type: 'varchar', length: 255, nullable: true })
    storeAddress: string;

    @Column({ name: 'store_address_google_map', type: 'varchar', length: 255, nullable: true })
    storeAddressGoogleMap: string;

    @Column({ name: 'store_phone', type: 'varchar', length: 255, nullable: true })
    storePhone: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;

    public getSearchables() {
        return {
          province: 'LIKE',
          city: 'LIKE',
          storeName: 'LIKE'
        };
    }

    public getDefaultOrderBy() {
        return {
          columnName: 'createdAt',
          order: 'desc',
        };
    }
}