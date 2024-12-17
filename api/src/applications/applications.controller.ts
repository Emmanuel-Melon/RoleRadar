import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApplicationService } from './applications.service';
import { Prisma } from '@prisma/client';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  async findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.applicationService.findOne(id);
  }

  @Post()
  async create(@Body() data: Prisma.ApplicationCreateInput) {
    return this.applicationService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.ApplicationUpdateInput) {
    return this.applicationService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.applicationService.remove(id);
  }
} 