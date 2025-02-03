import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from 'src/database/prisma.service';

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
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
  }

  async create(user: Prisma.UserCreateInput) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const password = await bcrypt.hash(user.password, 10);
    return this.prisma.user.create({ data: { ...user, password } });
  }

  async update(params: UpdateUserParams): Promise<User> {
    const { data, where } = params;
    return this.prisma.user.update({ data, where });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
