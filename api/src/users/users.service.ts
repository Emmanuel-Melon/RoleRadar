import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }
  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async createRecruiter(data: Prisma.RecruiterProfileCreateInput) {
    return this.prisma.recruiterProfile.create({ data});
  }

  async createCandidate(data: Prisma.CandidateProfileCreateInput) {
    return this.prisma.candidateProfile.create({ data});
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}