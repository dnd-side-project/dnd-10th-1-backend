// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient({
        datasources: { db: { url: process.env.DATABASE_SEED_PUSH_MIGRATE_URL } },
});

async function main() {
        // create two dummy articles
        const user1 = await prisma.user.create({
                data: {
                        username: 'Jack',
                        email: 'jack@example.com',
                        password: '123456',
                },
        });

        const user2 = await prisma.user.create({
                data: {
                        username: 'bob',
                        email: 'bob@example.com',
                        password: '123456',
                },
        });

        console.log({ user1, user2 });
}

// execute the main function
main()
        .catch((e) => {
                console.error(e);
                process.exit(1);
        })
        .finally(async () => {
                // close Prisma Client at the end
                await prisma.$disconnect();
        });
