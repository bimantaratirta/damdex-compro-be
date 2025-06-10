import { EntityManager, Repository } from "typeorm";
import { Store } from "src/entities/store.entity";
import { InjectEntityManager } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StoreRepository extends Repository<Store> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) {
        super(Store, entityManager);
    }
}