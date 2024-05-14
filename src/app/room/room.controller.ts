import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CommonParams } from '../user/dto/common-params.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('all')
  async getAll() {
    return this.roomService.getAll();
  }

  @Get(':id')
  async getChatRoomById(@Param(new ValidationPipe()) params: CommonParams) {
    return this.roomService.getOne({ id: params.id });
  }

  @Post()
  async createChatRoom(
    @Body(new ValidationPipe()) createChatRoomDto: CreateChatRoomDto,
  ) {
    return this.roomService.create({
      name: createChatRoomDto.name,
      createdBy: {
        connect: { id: createChatRoomDto.createdById },
      },
      isGroup: true,
      users: {
        connect: createChatRoomDto.userIds?.map((id) => ({ id })),
      },
      messages: {
        connect: createChatRoomDto.messageIds?.map((id) => ({ id })),
      },
    });
  }
}
