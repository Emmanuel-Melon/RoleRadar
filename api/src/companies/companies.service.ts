import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.company.findMany();
  }

  async findOne(id: string) {
    return this.prisma.company.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({
      data,
    });
  }

  async update(id: string, data: Prisma.CompanyUpdateInput) {
    return this.prisma.company.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.company.delete({
      where: { id },
    });
  }

}
