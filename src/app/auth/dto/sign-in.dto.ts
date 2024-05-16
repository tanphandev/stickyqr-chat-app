import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  phoneNumber: string;

  @IsString()
  password: string;
}
