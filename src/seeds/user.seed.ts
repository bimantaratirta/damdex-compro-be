import { User } from "src/entities/user.entity";
import { DataSource, DeepPartial } from "typeorm";
import { Seeder } from "typeorm-extension";
import * as argon2 from 'argon2';

export class UserSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<any> {
        const usersToDelete: DeepPartial<User>[] = [
            {
              username: 'admin',
              email: 'admin@gmail.com',
              password: await argon2.hash('password'),
              firstName: 'Admin',
              lastName: null,
            },
        ];

        const usersToCreate: DeepPartial<User>[] = [
            {
                username: 'admincms',
                email: 'admincms@gmail.com',
                password: await argon2.hash('AdminCMSDamdex123!@#'),
                firstName: 'Admin CMS',
                lastName: null,
            },
        ];

        await Promise.all(usersToDelete.map(async (user) => {
            const existingUser = await dataSource.manager.findOne(User, {
                where: {
                    email: user.email,
                },
            });

            if (existingUser) {
                await dataSource.manager.softDelete(User, existingUser.id);
            }
        }))

        await Promise.all(usersToCreate.map(async (user) => {
            const existingUser = await dataSource.manager.findOne(User, {
                where: {
                    email: user.email,
                },
            });
            if (!existingUser) {
                const newUser = dataSource.manager.create(User, user);
                await dataSource.manager.save(newUser);
            }
        }))
    }
}