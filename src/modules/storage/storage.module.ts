import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [JwtModule],
  providers: [StorageService, UserRepository],
  exports: [StorageService],
  controllers: [StorageController],
})
export class StorageModule {}
