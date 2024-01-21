import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
        constructor(
                @InjectRedis()
                private readonly client: Redis /** @InjectRedis(REDIS_NAMESPACE) private readonly redis: Redis */,
        ) {}

        private async get(key: string) {
                await this.client.get(key);
        }

        private async set(key: string, payload: any) {
                await this.client.set(key, JSON.stringify(payload));
        }

        async setRoom(payload: any) {
                await this.set('room', payload);
        }
}
