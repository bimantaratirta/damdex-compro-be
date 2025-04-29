import { InjectEntityManager } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { EntityManager, Repository } from "typeorm";

export class ProductRepository extends Repository<Product> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) {
        super(Product, entityManager);
    }
}