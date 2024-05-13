import { Module } from '@nestjs/common';
import { ChatService } from './room.service';
import { ChatController } from './room.controller';

@Module({
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
