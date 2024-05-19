import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CommonParams } from './dto/common-params.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getUserById(@Param(new ValidationPipe()) params: CommonParams) {
    const user = await this.userService.getOne({
      id: params.id,
    });
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
