import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class ProductRepository extends Repository<Product> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) {
        super(Product, entityManager);
    }
}