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
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './interceptor/timeout.interceptor';
import { AblyService } from './app/ably/ably.service';
import { AblyModule } from './app/ably/ably.module';
import { AblyController } from './app/ably/ably.controller';
import { AuthModule } from './app/auth/auth.module';
import { AuthService } from './app/auth/auth.service';
import { AuthController } from './app/auth/auth.controller';
import { AccessTokenGuard } from './guard/access-token.guard';

@Module({
  imports: [UserModule, RoomModule, MessageModule, AblyModule, AuthModule],
  controllers: [
    UserController,
    RoomController,
    MessageController,
    AuthController,
    AblyController,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    UserService,
    RoomService,
    MessageService,
    AuthService,
    AblyService,
    PrismaService,
  ],
})
export class AppModule {}
