import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { GalleryEvent } from "src/entities/gallery-event.entity";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class GalleryEventRepository extends Repository<GalleryEvent> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) {
        super(GalleryEvent, entityManager);
    }

    async saveIdn() {
        
    }
}