import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async get(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        createAt: true,
        updatedAt: true,
      },
    });
  }

  async create(user: CreateUserDto): Promise<User | null> {
    const password = await bcrypt.hash(user.password, 10);
    return this.prisma.user.create({
      data: { ...user, password },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        createAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      data: user,
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        createAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        createAt: true,
        updatedAt: true,
      },
    });
  }
}
