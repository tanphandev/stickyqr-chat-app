import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PrismaService, MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
