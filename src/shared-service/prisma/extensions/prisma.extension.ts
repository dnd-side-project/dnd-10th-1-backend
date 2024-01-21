import { PrismaService } from '../prisma.service';

export const createPrismaExtension = (prisma: PrismaService) =>
        prisma.$extends({
                model: {
                        // user: {},
                },
                query: {
                        //         $allOperations(args) {
                        //                 return excludeExtension(args);
                        //         },
                        user: {
                                async findFirst({ model, operation, args, query }) {
                                        const user = await query(args);

                                        if (user.password !== undefined) {
                                                user.password = '******';
                                        }

                                        return user;
                                },
                        },
                },
        });
