import { Module } from '@nestjs/common';
import { PrismaService } from './app/prisma/prisma.service';
import { ChatModule } from './app/room/room.module';
import { ChatController } from './app/room/room.controller';
import { ChatService } from './app/room/room.service';
import { UserModule } from './app/user/user.module';
import { MessageModule } from './app/message/message.module';
import { UserController } from './app/user/user.controller';
import { MessageController } from './app/message/message.controller';
import { UserService } from './app/user/user.service';
import { MessageService } from './app/message/message.service';

@Module({
  imports: [UserModule, ChatModule, MessageModule],
  controllers: [UserController, ChatController, MessageController],
  providers: [PrismaService, UserService, ChatService, MessageService],
})
export class AppModule {}
