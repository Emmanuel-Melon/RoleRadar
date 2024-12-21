import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.MessageCreateInput) {
    return this.prisma.message.create({
      data,
    });
  }

  async getConversation(senderId: string, receiverId: string) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          {
            AND: [
              { senderId: senderId },
              { receiverId: receiverId },
            ],
          },
          {
            AND: [
              { senderId: receiverId },
              { receiverId: senderId },
            ],
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
