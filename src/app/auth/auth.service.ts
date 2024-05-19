import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { checkHash, hashString } from 'src/helper/hash-string';
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayload } from './types/jwt-payload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpdata: SignUpDto) {
    // check if user already exists
    const isUserExist = await this.userService.getOne({
      phoneNumber: signUpdata.phoneNumber,
    });
    if (isUserExist) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    //encode password
    const hashPassword = await hashString(signUpdata.password);
    const newUser = {
      name: signUpdata.name,
      phoneNumber: signUpdata.phoneNumber,
      password: hashPassword,
    };

    // create user
    const user = await this.userService.create(newUser);
    if (!user) {
      throw new HttpException('User not created', HttpStatus.FORBIDDEN);
    }

    // get tokens
    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async signIn(signIndata: SignInDto) {
    const user = await this.userService.getOne({
      phoneNumber: signIndata.phoneNumber,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isMatchPassword = await checkHash(user.password, signIndata.password);
    if (!isMatchPassword) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    // get tokens
    const tokens = await this.getTokens(user.id, user.name);
    // update rf token
    this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.getOne({
      id: userId,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    console.log('hashedRt', user.hashedRt);
    console.log('refreshToken', refreshToken);
    //campare rt
    const refreshTokenMatch = await checkHash(user.hashedRt, refreshToken);
    console.log('refreshTokenMatch', refreshTokenMatch);
    if (!refreshTokenMatch) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }

    //get tokens
    const tokens = await this.getTokens(user.id, user.name);

    //update rf token
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async getProfile(userId: string) {
    const user = await this.userService.getOne({
      id: userId,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const { password, hashedRt, ...profile } = user;
    return profile;
  }

  private async updateRtHash(userId: string, rt: string) {
    const hashedRt = await hashString(rt);

    await this.userService.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hashedRt,
      },
    });
  }

  private async getTokens(userId: string, name?: string) {
    const jwtPayload: JwtPayload = {
      userId: userId,
      name: name,
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_AT,
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_RT,
        expiresIn: '1d',
      }),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
