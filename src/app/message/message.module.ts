import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { PrismaService } from '../prisma/prisma.service';
import { AblyService } from '../ably/ably.service';

@Module({
  providers: [PrismaService, AblyService, MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
