import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/database/prisma.service';
import { User } from './dto/user.dto';

type UpdateUserParams = {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
};

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

  async create(user: Prisma.UserCreateInput): Promise<User | null> {
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

  async update(params: UpdateUserParams): Promise<User> {
    const { data, where } = params;
    return this.prisma.user.update({
      data,
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
