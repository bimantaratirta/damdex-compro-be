import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { StoreRepository } from 'src/repositories/store.repository';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [JwtModule],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository, UserRepository]
})
export class StoreModule {}
