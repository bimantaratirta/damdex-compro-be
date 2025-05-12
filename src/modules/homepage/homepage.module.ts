import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller';
import { HomepageRepository } from 'src/repositories/homepage.repository';
import { HomepageService } from './homepage.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user.repository';
import { StorageModule } from '../storage/storage.module';
@Module({
  imports: [JwtModule, StorageModule],
  providers: [UserRepository, HomepageRepository, HomepageService],
  controllers: [HomepageController]
})
export class HomepageModule {}
