import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

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
} 