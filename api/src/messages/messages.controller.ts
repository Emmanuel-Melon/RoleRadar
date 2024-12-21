import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MessageService } from './messages.service';
import { Prisma } from '@prisma/client';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll(@Query('userId') userId: string) {
    return this.messageService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Post()
  async create(@Body() data: Prisma.MessageCreateInput) {
    return this.messageService.create(data);
  }

  @Get('conversation/:senderId/:receiverId')
  async getConversation(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ) {
    return this.messageService.getConversation(senderId, receiverId);
  }
}
