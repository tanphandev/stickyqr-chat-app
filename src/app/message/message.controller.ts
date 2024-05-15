import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CommonParams } from '../user/dto/common-params.dto';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import { Prisma } from '@prisma/client';
import { AblyMesssage } from '../ably/interfaces/ably-message.interface';
import { ABLY_EVENT } from '../ably/constant';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  // get all messages
  @Get('all')
  async getAll() {
    return this.messageService.getAll();
  }

  // get message by id
  @Get(':id')
  async getChatMessageById(@Param(new ValidationPipe()) params: CommonParams) {
    const message = await this.messageService.getOne({ id: params.id });
    if (message === null) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  // create new message
  @Post()
  async createChatMessage(
    @Body(new ValidationPipe()) createChatMessageDto: CreateChatMessageDto,
  ) {
    const dataCreate: Prisma.ChatMessageCreateInput = {
      type: createChatMessageDto.type,
      body: createChatMessageDto.body,
      sender: {
        connect: { id: createChatMessageDto.senderId },
      },
      chatRoom: {
        connect: {
          id: createChatMessageDto.chatRoomId,
        },
      },
    };

    const ablyMessage: AblyMesssage = {
      channel: createChatMessageDto.chatRoomId,
      event: ABLY_EVENT.NEW_MESSAGE,
      message: {
        type: createChatMessageDto.type,
        body: createChatMessageDto.body,
        senderId: createChatMessageDto.senderId,
        chatRoomId: createChatMessageDto.chatRoomId,
      },
    };
    return this.messageService.create(dataCreate, ablyMessage);
  }

  // update message by id
  @Put(':id')
  async updateChatMessage(
    @Param(new ValidationPipe()) params: CommonParams,
    @Body(new ValidationPipe()) updateChatMessageDto: UpdateChatMessageDto,
  ) {
    return this.messageService.updateOne(
      { id: params.id },
      {
        type: updateChatMessageDto.type,
        body: updateChatMessageDto.body,
      },
    );
  }
}
