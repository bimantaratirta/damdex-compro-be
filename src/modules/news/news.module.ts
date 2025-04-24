import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsRepository } from 'src/repositories/news.repository';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [JwtModule],
  providers: [NewsService, NewsRepository, UserRepository],
  controllers: [NewsController]
})
export class NewsModule {}
