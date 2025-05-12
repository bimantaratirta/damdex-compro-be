import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { UseCompositionUseFor } from "src/entities/use-composition-use-for.entity";
import { EntityManager } from "typeorm";

@Injectable()
export class UseCompositionUseForRepository extends Repository<UseCompositionUseFor> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {
        super(UseCompositionUseFor, entityManager);
    }
}