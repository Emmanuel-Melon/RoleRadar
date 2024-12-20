import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Project, Education, Experience } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.create(data);
  }

  @Post('/recruiter')
  async createRecruiter(@Body() data: Prisma.RecruiterProfileCreateInput) {
    return this.usersService.createRecruiter(data);
  }

  @Post('/candidate')
  async createCandidate(@Body() data: Prisma.CandidateProfileCreateInput) {
    return this.usersService.createCandidate(data);
  }

  @Post('/experience')
  async addWorkExperience(@Body() data: Prisma.ExperienceCreateInput) {
    return this.usersService.addWorkExperience(data);
  }

  @Post('/projects')
  async addProject(@Body() data: Prisma.ProjectCreateInput) {
    return this.usersService.addProject(data);
  }

  @Post('/education')
  async addEducation(@Body() data: Prisma.EducationCreateInput) {
    return this.usersService.addEducation(data);
  }

  @Get()
  findAll(): Promise<User[]> {
    return Promise.resolve(this.usersService.findAll());
  }

  @Get('/:id/experience')
  getUserWorkExperience(@Param('id') id: string): Promise<Experience[]> {
    return Promise.resolve(this.usersService.getUserWorkExperience(id));
  }

  @Get('/:id/education')
  getUserEducation(@Param('id') id: string): Promise<Education[]> {
    return Promise.resolve(this.usersService.getUserEducation(id));
  }

  @Get('/:id/projects')
  getUserProjects(@Param('id') id: string): Promise<Project[]> {
    return Promise.resolve(this.usersService.getUserProjects(id));
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
