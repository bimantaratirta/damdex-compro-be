import { User } from "src/entities/user.entity";
import { DataSource, DeepPartial } from "typeorm";
import { Seeder } from "typeorm-extension";
import * as argon2 from 'argon2';

export class UserSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<any> {
        const users: DeepPartial<User>[] = [
            {
              username: 'admin',
              email: 'admin@gmail.com',
              password: await argon2.hash('password'),
              firstName: 'Admin',
              lastName: null,
            },
        ];
      
        const newUsers = dataSource.manager.create(User, users);
        await dataSource.manager.save(newUsers);
    }
}