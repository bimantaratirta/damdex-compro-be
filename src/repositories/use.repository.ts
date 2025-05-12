import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { Use } from "src/entities/use.entity";
import { DataSource } from "typeorm";

@Injectable()
export class UseRepository extends Repository<Use> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {
        super(Use, entityManager);
    }
}
