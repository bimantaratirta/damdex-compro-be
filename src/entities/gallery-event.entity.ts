import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'gallery_events' })
export class GalleryEvent {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'hero_image', type: 'varchar', length: 255, nullable: true, })
    heroImage: string;

    @Column({ name: 'event_date', type: 'timestamp', nullable: true, })
    eventDate: Date;

    @Column({ name: 'title_id', type: 'varchar', length: 255, nullable: true, })
    titleIDN: string;

    @Column({ name: 'event_venue_id', type: 'varchar', length: 255, nullable: true, })
    eventVenueIDN: string;

    @Column({ name: 'event_theme_id', type: 'varchar', length: 255, nullable: true, })
    eventThemeIDN: string;

    @Column({ name: 'event_description_id', type: 'text', nullable: true, })
    eventDescriptionIDN: string;

    @Column({ name: 'title_eng', type: 'varchar', length: 255, nullable: true, })
    titleENG: string;

    @Column({ name: 'event_venue_eng', type: 'varchar', length: 255, nullable: true, })
    eventVenueENG: string;

    @Column({ name: 'event_theme_eng', type: 'varchar', length: 255, nullable: true, })
    eventThemeENG: string;

    @Column({ name: 'event_description_eng', type: 'text', nullable: true, })
    eventDescriptionENG: string;
    
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