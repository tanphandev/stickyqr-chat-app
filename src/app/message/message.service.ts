import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatMessage, Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<ChatMessage[]> {
    return this.prisma.chatMessage.findMany();
  }

  async getOne(
    chatMessageWhereUniqueInput: Prisma.ChatMessageWhereUniqueInput,
  ): Promise<ChatMessage> {
    return this.prisma.chatMessage.findUnique({
      where: chatMessageWhereUniqueInput,
    });
  }

  async create(data: Prisma.ChatMessageCreateInput): Promise<ChatMessage> {
    return this.prisma.chatMessage.create({
      data,
    });
  }

  async updateOne(
    chatMessageWhereUniqueInput: Prisma.ChatMessageWhereUniqueInput,
    data: Prisma.ChatMessageUpdateInput,
  ): Promise<ChatMessage> {
    return this.prisma.chatMessage.update({
      where: chatMessageWhereUniqueInput,
      data,
    });
  }
}
