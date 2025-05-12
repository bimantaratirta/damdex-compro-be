import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { UseComposition } from "src/entities/use-composition.entity";
import { Repository } from "typeorm";

@Injectable()
export class UseCompositionRepository extends Repository<UseComposition> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {
        super(UseComposition, entityManager);
    }
}