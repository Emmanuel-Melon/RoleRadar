import { Controller, Get, Param } from '@nestjs/common';
import { ApplicationService } from './applications.service';

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
} 