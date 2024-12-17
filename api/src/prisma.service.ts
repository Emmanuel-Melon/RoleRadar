import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      // Optional: add Prisma logging
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.error('Error connecting to database', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  //   // Optional: Add method to clear database (useful for testing)
  //   async clearDatabase() {
  //     const modelNames = Reflect.ownKeys(this)
  //       .filter(key => typeof key === 'string' && key !== '$connect' && key !== '$disconnect' && !key.startsWith('$'))
  //       .map(key => String(key));

  //     for (const modelName of modelNames) {
  //       await (this as any)[modelName].deleteMany();
  //     }
  //   }
}
