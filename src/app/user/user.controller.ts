import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CommonParams } from './dto/common-params.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getUserById(
    @Param(new ValidationPipe()) params: CommonParams,
  ): Promise<User | null> {
    const user = await this.userService.getOne({
      id: params.id,
    });
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  async createUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.create({
      name: createUserDto.name,
    });
  }
}
