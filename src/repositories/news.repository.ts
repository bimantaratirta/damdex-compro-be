import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { News } from "src/entities/news.entity";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class NewsRepository extends Repository<News> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) {
        super(News, entityManager);
    }
}