import { IsMongoId } from 'class-validator';

export class CommonParams {
  @IsMongoId()
  id: string;
}
