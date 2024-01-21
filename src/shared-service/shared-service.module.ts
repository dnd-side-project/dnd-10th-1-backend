import type { Provider as ProviderType } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

import { AwsModule, AwsS3Service } from './aws';
import { ApiConfigService, EnvModule } from './env';
import { EmailModule, EmailSenderService } from './mail';
import { PrismaModule, PrismaService } from './prisma';
import { MyRedisModule, RedisService } from './redis';

const providers: ProviderType[] = [
        ApiConfigService,
        PrismaService,
        AwsS3Service,
        EmailSenderService,
        RedisService,
];

const modules: any[] = [PrismaModule, EnvModule, AwsModule, EmailModule, MyRedisModule];

@Global()
@Module({
        imports: [...modules],
        providers: [],
        exports: [...providers],
})
export class SharedServiceModule {}
