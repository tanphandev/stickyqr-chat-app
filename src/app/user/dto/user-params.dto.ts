import { IsMongoId } from 'class-validator';

export class UserParams {
  @IsMongoId()
  id: string;
}
