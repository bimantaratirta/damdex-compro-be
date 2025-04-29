import { InjectEntityManager } from "@nestjs/typeorm";
import { ProductAdvantage } from "src/entities/product-advantage.entity";
import { EntityManager, Repository } from "typeorm";

export class ProductAdvantageRepository extends Repository<ProductAdvantage> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {
        super(ProductAdvantage, entityManager);
    }
}