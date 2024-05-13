import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { UserParams } from './dto/user-params.dto';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getUserById(@Param() params: UserParams): Promise<User | null> {
    return await this.userService.getOne({
      id: params.id,
    });
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
