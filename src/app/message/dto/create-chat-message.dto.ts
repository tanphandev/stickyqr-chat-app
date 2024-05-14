import { MessageType } from '@prisma/client';
import { IsEnum, IsMongoId, IsString } from 'class-validator';

export class CreateChatMessageDto {
  @IsString()
  body: string;

  @IsEnum(MessageType)
  type: MessageType;

  @IsMongoId()
  senderId: string;

  @IsMongoId()
  chatRoomId: string;
}
