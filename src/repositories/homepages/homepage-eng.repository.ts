import { InjectEntityManager } from "@nestjs/typeorm";
import { HomepageEng } from "src/entities/homepages/homepage-eng.entity";
import { EntityManager, Repository } from "typeorm";

export class HomepageEngRepository extends Repository<HomepageEng> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) {
        super(HomepageEng, entityManager);
    }
}