import { Module } from '@nestjs/common';
import { PrismaService } from './app/prisma/prisma.service';
import { UserModule } from './app/user/user.module';
import { UserController } from './app/user/user.controller';
import { UserService } from './app/user/user.service';
import { RoomController } from './app/room/room.controller';
import { RoomService } from './app/room/room.service';
import { RoomModule } from './app/room/room.module';
import { MessageController } from './app/message/message.controller';
import { MessageService } from './app/message/message.service';
import { MessageModule } from './app/message/message.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './interceptor/timeout.interceptor';

@Module({
  imports: [UserModule, RoomModule, MessageModule],
  controllers: [UserController, RoomController, MessageController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    PrismaService,
    UserService,
    RoomService,
    MessageService,
  ],
})
export class AppModule {}
