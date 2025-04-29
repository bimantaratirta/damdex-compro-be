import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductAdvantageRepository } from 'src/repositories/product-advantage.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, ProductAdvantageRepository]
})
export class ProductModule {}
