import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async getUserEducation(userId: string) {
    return this.prisma.education.findMany({
      where: { userId }
    });
  }

  async getUserWorkExperience(userId: string) {
    return this.prisma.experience.findMany({
      where: { userId }
    });
  }

  async getUserProjects(userId: string) {
    return this.prisma.project.findMany({
      where: { userId }
    });
  }
  async create(data: Prisma.UserCreateInput) {
    console.log("creating user", data);
    return this.prisma.user.create({ data });
  }

  async createRecruiter(data: Prisma.RecruiterProfileCreateInput) {
    return this.prisma.recruiterProfile.create({ data});
  }

  async createCandidate(data: Prisma.CandidateProfileCreateInput) {
    return this.prisma.candidateProfile.create({ data});
  }

  async addWorkExperience(data: Prisma.ExperienceCreateInput) {
    return this.prisma.experience.create({ data});
  }

  async addProject(data: Prisma.ProjectCreateInput) {
    return this.prisma.project.create({ data});
  }

  async addEducation(data: Prisma.EducationCreateInput) {
    return this.prisma.education.create({ data});
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ 
      where: { id },
      include: {
        candidateProfile: true
      } 
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}