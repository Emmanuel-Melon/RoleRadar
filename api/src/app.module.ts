import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidateService } from './candidates/candidates.service';
import { CandidateController } from './candidates/candidates.controller';
import { PrismaService } from './prisma.service';
@Module({
  imports: [],
  controllers: [AppController, CandidateController],
  providers: [AppService, PrismaService, CandidateService],
})
export class AppModule {}
