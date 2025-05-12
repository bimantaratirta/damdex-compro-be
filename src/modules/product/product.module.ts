import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductAdvantageRepository } from 'src/repositories/product-advantage.repository';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user.repository';
import { ProductAdvantageService } from './product-advantage.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [JwtModule, StorageModule],
  controllers: [ProductController],
  providers: [ProductService,ProductAdvantageService, ProductRepository, ProductAdvantageRepository, UserRepository]
})
export class ProductModule {}
