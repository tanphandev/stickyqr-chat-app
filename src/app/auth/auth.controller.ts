import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AccessTokenGuard } from 'src/guard/access-token.guard';
import { Public } from 'src/decorators/public.decorator';
import { RefreshTokenGuard } from 'src/guard/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('login')
  async login(@Body(new ValidationPipe()) signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('refresh')
  @Public()
  @UseGuards(RefreshTokenGuard)
  async refresh(@Request() req) {
    const { refreshToken, userId } = req?.user;
    return await this.authService.refreshToken(userId, refreshToken);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    const { userId } = req?.user;
    return await this.authService.getProfile(userId);
  }
}
