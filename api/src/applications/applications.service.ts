import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.application.findMany({
      include: {
        jobPost: true,
        candidate: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.application.findUnique({
      where: { id },
      include: {
        jobPost: true,
        candidate: true,
      },
    });
  }

  async create(data: Prisma.ApplicationCreateInput) {
    return this.prisma.application.create({
      data: {
        ...data,
      },
      include: {
        jobPost: true,
        candidate: true,
      },
    });
  }

  async update(id: string, data: Prisma.ApplicationUpdateInput) {
    return this.prisma.application.update({
      where: { id },
      data,
      include: {
        jobPost: true,
        candidate: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.application.delete({
      where: { id },
    });
  }
} 