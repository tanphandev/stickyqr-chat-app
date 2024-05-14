import { ArrayMinSize, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  name: string;

  @IsMongoId()
  createdById: string;

  @IsOptional()
  @IsMongoId({ each: true })
  @ArrayMinSize(2, {
    message: 'The userIds array must contain at least 2 userId.',
  })
  userIds?: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  // @ArrayMinSize(1, {
  //   message: 'The messageIds array must contain at least 1 messageId.',
  // })
  messageIds?: string[];
}
