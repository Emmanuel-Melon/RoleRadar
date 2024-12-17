import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { JobService } from './jobs.service';
import { Prisma } from '@prisma/client';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async findAll() {
    return this.jobService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Post()
  async create(@Body() data: Prisma.JobPostCreateInput) {
    return this.jobService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.JobPostUpdateInput) {
    return this.jobService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.jobService.remove(id);
  }
} 