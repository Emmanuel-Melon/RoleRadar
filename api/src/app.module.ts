import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidateService } from './candidates/candidates.service';
import { CandidateController } from './candidates/candidates.controller';
import { JobController } from './jobs/jobs.controller';
import { JobService } from './jobs/jobs.service';
import { ApplicationController } from './applications/applications.controller';
import { ApplicationService } from './applications/applications.service';
import { PrismaService } from './prisma.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    CandidateController,
    JobController,
    ApplicationController,
    UsersController
  ],
  providers: [
    AppService,
    PrismaService,
    CandidateService,
    JobService,
    ApplicationService,
    UsersService
  ],
})
export class AppModule {}
