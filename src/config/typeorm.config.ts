import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import dbConfig from './db.config';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      url: dbConfig().DB_URI,
      entities: [],
      synchronize: false,
    };
  },
};
