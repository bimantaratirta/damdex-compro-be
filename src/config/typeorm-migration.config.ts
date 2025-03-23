import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import dbConfig from './db.config';
import { MIGRATIONS } from '../constant/migrations.constant';
import { ENTITIES } from '../constant/entities.constant';

dotenv.config();

const options: DataSourceOptions = {
  type: 'mysql',
  url: dbConfig().DB_URI,
  entities: ENTITIES,
  migrations: MIGRATIONS,
  migrationsTableName: 'migrations',
};

export const dataSouce = new DataSource(options);
