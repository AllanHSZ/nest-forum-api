import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: Prisma.UserCreateInput) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    return this.generateTokens(user.id);
  }

  async refresh(user: number, token: string) {
    const payload = this.jwtService.verify<{ type: string; sub: number }>(
      token,
    );

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token');
    }

    console.log(user, payload);
    if (user !== payload.sub) {
      throw new UnauthorizedException('Invalid user token');
    }

    return this.generateTokens(payload.sub);
  }

  private async generateTokens(user: number): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const payload = { sub: user };
    const access_token = await this.jwtService.signAsync(
      { ...payload, type: 'access' },
      { expiresIn: '60s' },
    );

    const refresh_token = await this.jwtService.signAsync(
      { ...payload, type: 'refresh' },
      { expiresIn: '1h' },
    );

    return {
      access_token,
      refresh_token,
    };
  }
}
