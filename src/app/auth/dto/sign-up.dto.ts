import { IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  password: string;
}
