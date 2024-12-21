import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.jobPost.findMany();
  }

  async findOne(id: string) {
    return this.prisma.jobPost.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.JobPostCreateInput) {
    return this.prisma.jobPost.create({
      data,
      include: {
        applications: true,
      },
    });
  }

  async update(id: string, data: Prisma.JobPostUpdateInput) {
    return this.prisma.jobPost.update({
      where: { id },
      data,
      include: {
        applications: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.jobPost.delete({
      where: { id },
    });
  }
} 