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
import { AblyService } from './app/ably/ably.service';
import { AblyModule } from './app/ably/ably.module';
import { AblyController } from './app/ably/ably.controller';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [UserModule, RoomModule, MessageModule, AblyModule, AuthModule],
  controllers: [
    UserController,
    RoomController,
    MessageController,
    AblyController,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    AblyService,
    PrismaService,
    UserService,
    RoomService,
    MessageService,
  ],
})
export class AppModule {}
