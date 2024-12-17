import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CandidateService } from './candidates.service';
import { Prisma } from '@prisma/client';

@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get()
  async findAll() {
    return this.candidateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.candidateService.findOne(id);
  }

  @Post()
  async create(@Body() data: Prisma.CandidateProfileCreateInput) {
    return this.candidateService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.CandidateProfileUpdateInput) {
    return this.candidateService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.candidateService.remove(id);
  }
}
