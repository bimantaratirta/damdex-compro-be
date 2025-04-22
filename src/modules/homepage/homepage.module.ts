import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller';
import { HomepageRepository } from 'src/repositories/homepage.repository';
import { HomepageService } from './homepage.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [JwtModule],
  providers: [UserRepository, HomepageRepository, HomepageService],
  controllers: [HomepageController]
})
export class HomepageModule {}
