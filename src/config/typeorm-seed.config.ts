import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dbConfig from './db.config';
import { ENTITIES } from '../constant/entities.constant';
import { UserSeeder } from '../seeds/user.seed';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    url: dbConfig().DB_URI,
    entities: ENTITIES,
    seeds: [UserSeeder],
    factories: [],
}

export const dataSource = new DataSource(options);