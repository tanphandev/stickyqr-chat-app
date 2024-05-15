import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatRoom, Prisma } from '@prisma/client';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ChatRoomCreateInput): Promise<ChatRoom> {
    return this.prisma.chatRoom.create({ data });
  }

  async getAll(): Promise<ChatRoom[]> {
    return this.prisma.chatRoom.findMany({
      include: {
        users: true,
        messages: true,
      },
    });
  }

  async getOne(
    roomWhereUniqueInput: Prisma.ChatRoomWhereUniqueInput,
  ): Promise<ChatRoom | null> {
    return this.prisma.chatRoom.findUnique({
      where: roomWhereUniqueInput,
      include: {
        users: true,
        messages: true,
      },
    });
  }

  async getMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ChatRoomWhereUniqueInput;
    where?: Prisma.ChatRoomWhereInput;
    orderBy?: Prisma.ChatRoomOrderByWithRelationInput;
  }): Promise<ChatRoom[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.chatRoom.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        users: true,
        messages: true,
      },
    });
  }

  async updateOne(
    roomWhereUniqueInput: Prisma.ChatRoomWhereUniqueInput,
    data: Prisma.ChatRoomUpdateInput,
  ): Promise<ChatRoom> {
    console.log('roomWhereUniqueInput', roomWhereUniqueInput);
    console.log('data', data);
    return this.prisma.chatRoom.update({
      where: roomWhereUniqueInput,
      data,
      include: {
        users: true,
        messages: true,
      },
    });
  }
}
