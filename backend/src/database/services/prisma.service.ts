import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['error', 'query', 'info', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHook(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
