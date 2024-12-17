import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.candidateProfile.findMany();
  }
}
