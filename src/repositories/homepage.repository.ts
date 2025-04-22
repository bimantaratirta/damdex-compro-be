import { InjectEntityManager } from "@nestjs/typeorm";
import { Homepage } from "src/entities/homepage.entity";
import { EntityManager, Repository } from "typeorm";

export class HomepageRepository extends Repository<Homepage> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) {
        super(Homepage, entityManager);
    }
}