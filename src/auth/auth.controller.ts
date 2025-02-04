import { Prisma } from '@prisma/client';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh.dto';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async sigIn(@Body() user: Prisma.UserCreateInput) {
    return this.authService.signIn(user);
  }

  @Post('refresh')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body() data: RefreshTokenDto,
    @Request() request: ExpressRequest,
  ) {
    return this.authService.refresh(request.user, data.refresh_token);
  }
}
