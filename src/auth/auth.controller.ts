import { Prisma } from '@prisma/client';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async sigIn(@Body() user: Prisma.UserCreateInput) {
    return this.authService.signIn(user);
  }
}
