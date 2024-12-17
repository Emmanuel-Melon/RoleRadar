import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.create(data);
  }

  @Get()
  findAll(): Promise<User[]> {
    return Promise.resolve(this.usersService.findAll());
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    console.log("user", user);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}