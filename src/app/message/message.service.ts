import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatMessage, Prisma } from '@prisma/client';
import { AblyService } from '../ably/ably.service';
import { AblyMesssage } from '../ably/interfaces/ably-message.interface';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private ablyService: AblyService,
  ) {}

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

  async create(
    data: Prisma.ChatMessageCreateInput,
    ablyMessage: AblyMesssage,
  ): Promise<ChatMessage> {
    // Send message to Ably
    await this.ablyService.sendMessage(
      ablyMessage.channel,
      ablyMessage.event,
      data.body,
    );

    // Save message to database
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
