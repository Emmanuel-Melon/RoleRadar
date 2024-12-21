import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.company.findMany({
      include: {
        jobs: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.company.findUnique({
      where: { id },
      include: {
        jobs: true,
      },
    });
  }

  async create(data: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({
      data,
      include: {
        jobs: true,
      },
    });
  }

  async update(id: string, data: Prisma.CompanyUpdateInput) {
    return this.prisma.company.update({
      where: { id },
      data,
      include: {
        jobs: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.company.delete({
      where: { id },
    });
  }

  async findCompanyJobs(id: string) {
    return this.prisma.job.findMany({
      where: {
        companyId: id,
      },
      include: {
        company: true,
        applications: true,
      },
    });
  }
}
