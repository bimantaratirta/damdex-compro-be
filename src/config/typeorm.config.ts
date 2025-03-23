import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import dbConfig from './db.config';
import { ENTITIES } from 'src/constant/entities.constant';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      url: dbConfig().DB_URI,
      entities: ENTITIES,
      synchronize: false,
    };
  },
};
