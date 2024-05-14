import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatRoom, Prisma } from '@prisma/client';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ChatRoomCreateInput) {
    return this.prisma.chatRoom.create({ data });
  }

  async getAll(): Promise<ChatRoom[]> {
    return this.prisma.chatRoom.findMany();
  }

  async getOne(
    roomWhereUniqueInput: Prisma.ChatRoomWhereUniqueInput,
  ): Promise<ChatRoom | null> {
    try {
      return this.prisma.chatRoom.findUnique({
        where: roomWhereUniqueInput,
      });
    } catch (e) {
      throw new NotFoundException(`Chat Room not found`);
    }
  }

  async updateOne(
    roomWhereUniqueInput: Prisma.ChatRoomWhereUniqueInput,
    data: Prisma.ChatRoomUpdateInput,
  ): Promise<ChatRoom> {
    try {
      return this.prisma.chatRoom.update({
        where: roomWhereUniqueInput,
        data,
      });
    } catch (e) {
      throw new NotFoundException(`Chat Room not found`);
    }
  }
}
