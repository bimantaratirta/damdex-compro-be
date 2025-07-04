import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import appConfig from './config/app.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HomepageModule } from './modules/homepage/homepage.module';
import { StorageModule } from './modules/storage/storage.module';
import { NewsModule } from './modules/news/news.module';
import { GalleryEventModule } from './modules/gallery-event/gallery-event.module';
import { ProjectModule } from './modules/project/project.module';
import { ProductModule } from './modules/product/product.module';
import { UseModule } from './modules/use/use.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [dbConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    UserModule,
    HomepageModule,
    // StorageModule,
    NewsModule,
    GalleryEventModule,
    ProjectModule,
    ProductModule,
    UseModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
