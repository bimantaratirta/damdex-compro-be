import { Module } from '@nestjs/common';
import { GalleryEventService } from './gallery-event.service';
import { GalleryEventController } from './gallery-event.controller';
import { GalleryEventRepository } from 'src/repositories/gallery-event.repository';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user.repository';
import { StorageModule } from '../storage/storage.module';
@Module({
  imports: [JwtModule, StorageModule],
  providers: [GalleryEventService, GalleryEventRepository, UserRepository],
  controllers: [GalleryEventController]
})
export class GalleryEventModule {}
