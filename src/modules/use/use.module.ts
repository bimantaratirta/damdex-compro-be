import { Module } from '@nestjs/common';
import { UseService } from './use.service';
import { UseController } from './use.controller';
import { UseCompositionService } from './use-composition.service';
import { UseCompositionUseForService } from './use-composition-use-for.service';
import { UseRepository } from 'src/repositories/use.repository';
import { UseCompositionRepository } from 'src/repositories/use-composition.repository';
import { UseCompositionUseForRepository } from 'src/repositories/use-composition-use-for.repository';
import { JwtModule } from '@nestjs/jwt';
import { StorageModule } from '../storage/storage.module';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [JwtModule, StorageModule],
  providers: [
    UseService,
    UseCompositionService,
    UseCompositionUseForService,
    UseRepository,
    UseCompositionRepository,
    UseCompositionUseForRepository,
    UserRepository,
  ],
  controllers: [UseController],
})
export class UseModule {}
