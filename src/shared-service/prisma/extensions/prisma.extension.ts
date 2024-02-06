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
                },
        });
