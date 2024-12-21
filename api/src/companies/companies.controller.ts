import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CompanyService } from './companies.service';
import { Prisma } from '@prisma/client';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Post()
  async create(@Body() data: Prisma.CompanyCreateInput) {
    return this.companyService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.CompanyUpdateInput) {
    return this.companyService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }

  @Get(':id/jobs')
  async findCompanyJobs(@Param('id') id: string) {
    return this.companyService.findCompanyJobs(id);
  }
}
