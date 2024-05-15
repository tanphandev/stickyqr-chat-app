import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CommonParams } from '../user/dto/common-params.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';
import { ChatRoom, Prisma } from '@prisma/client';
import { UpdateChatRoomDto } from './dto/update-chatroom.dto';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('all')
  async getAll(): Promise<ChatRoom[]> {
    return this.roomService.getAll();
  }

  @Get(':id')
  async getChatRoomById(
    @Param(new ValidationPipe()) params: CommonParams,
  ): Promise<ChatRoom> {
    const room = await this.roomService.getOne({ id: params.id });
    if (room === null) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  @Get('user/:id')
  async getChatRoomsByUserId(
    @Param(new ValidationPipe()) params: CommonParams,
  ): Promise<ChatRoom[]> {
    return this.roomService.getMany({
      where: {
        users: {
          some: {
            id: params.id,
          },
        },
      },
    });
  }

  @Post()
  async createChatRoom(
    @Body(new ValidationPipe()) createChatRoomDto: CreateChatRoomDto,
  ): Promise<ChatRoom> {
    const isGroup = createChatRoomDto.userIds?.length >= 3;
    return this.roomService.create({
      name: createChatRoomDto.name,
      createdBy: {
        connect: { id: createChatRoomDto.createdById },
      },
      isGroup,
      users: {
        connect: createChatRoomDto.userIds?.map((id) => ({ id })),
      },
      messages: {
        connect: createChatRoomDto.messageIds?.map((id) => ({ id })),
      },
    });
  }

  @Put(':id')
  async updateChatRoom(
    @Param(new ValidationPipe()) params: CommonParams,
    @Body(new ValidationPipe()) updateChatRoomDto: UpdateChatRoomDto,
  ): Promise<ChatRoom> {
    const updateData: Prisma.ChatRoomUpdateInput = {
      isGroup: updateChatRoomDto.userIds?.length >= 3,
      users: {
        set: updateChatRoomDto.userIds?.map((id) => ({ id })),
      },
    };

    if (updateChatRoomDto?.name && updateChatRoomDto.name.trim() !== '') {
      updateData.name = updateChatRoomDto.name;
    }

    return this.roomService.updateOne(
      {
        id: params.id,
      },
      updateData,
    );
  }
}
