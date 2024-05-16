import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { checkHash, hashString } from 'src/helper/hash-string';
import { SignInDto } from './dto/sign-in.dto';

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

    this.userService.create(newUser);
    return {
      message: 'User created successfully',
    };
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

    const payload = {
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
