import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return this.prisma.candidateProfile.findMany({
      include: {
        applications: true,
        user: true
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.candidateProfile.findUnique({
      where: { id },
      include: {
        applications: true,
      },
    });
  }

  async create(data: Prisma.CandidateProfileCreateInput) {
    return this.prisma.candidateProfile.create({
      data,
      include: {
        applications: true,
      },
    });
  }

  async update(id: string, data: Prisma.CandidateProfileUpdateInput) {
    return this.prisma.candidateProfile.update({
      where: { id },
      data,
      include: {
        applications: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.candidateProfile.delete({
      where: { id },
    });
  }
}
