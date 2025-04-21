import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller';
import { HomepageEngService } from './services/homepage-eng.service';
import { HomepageIdService } from './services/homepage-id.service';
import { HomepageIdnRepository } from 'src/repositories/homepages/homepage-id.repository';

@Module({
  providers: [HomepageEngService, HomepageIdService, HomepageIdnRepository],
  controllers: [HomepageController]
})
export class HomepageModule {}
