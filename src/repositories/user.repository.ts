import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(
        @InjectEntityManager() private entityManager: EntityManager,
    ) {
        super(User, entityManager);
    }
}