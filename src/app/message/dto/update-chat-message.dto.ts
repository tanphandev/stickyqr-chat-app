import { MessageType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class UpdateChatMessageDto {
  @IsString()
  body: string;

  @IsEnum(MessageType)
  type: MessageType;
}
