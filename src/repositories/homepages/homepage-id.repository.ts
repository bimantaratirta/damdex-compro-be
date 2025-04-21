import { InjectEntityManager } from "@nestjs/typeorm";
import { HomepageIdn } from "src/entities/homepages/homepage-id.entity";
import { EntityManager, Repository } from "typeorm";

export class HomepageIdnRepository extends Repository<HomepageIdn> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) {
        super(HomepageIdn, entityManager);
    }
}