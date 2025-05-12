import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from 'src/repositories/project.repository';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user.repository';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [JwtModule, StorageModule],
  providers: [ProjectService, ProjectRepository, UserRepository],
  controllers: [ProjectController]
})
export class ProjectModule {}
