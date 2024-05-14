import { ArrayMinSize, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateChatRoomDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsMongoId({ each: true })
  @ArrayMinSize(2, {
    message: 'The userIds array must contain at least 2 userId.',
  })
  userIds?: string[];
}
