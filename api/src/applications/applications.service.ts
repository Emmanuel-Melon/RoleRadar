import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.application.findMany();
  }

  async findOne(id: string) {
    return this.prisma.application.findUnique({
      where: { id },
    });
  }
} 