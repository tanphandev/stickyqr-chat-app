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

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('all')
  async getAll() {
    return this.messageService.getAll();
  }

  @Get(':id')
  async getChatMessageById(@Param(new ValidationPipe()) params: CommonParams) {
    const message = await this.messageService.getOne({ id: params.id });
    if (message === null) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  @Post()
  async createChatMessage(
    @Body(new ValidationPipe()) createChatMessageDto: CreateChatMessageDto,
  ) {
    return this.messageService.create({
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
    });
  }

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
