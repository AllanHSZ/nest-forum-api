import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<User | null> {
    return this.userService.create(userData);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.get({ id });
  }

  @Patch(':id')
  async updateUser(
    @Body() userData: Prisma.UserUpdateInput,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.userService.update({
      where: { id },
      data: userData,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.delete({ id });
  }
}
