import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from '@nestjs/swagger';
import { LoginResponseBody } from 'src/types/auth.type';
import { FunctionRule } from 'src/decorators/rule.decorator';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @FunctionRule({
    auth: false,
    code: HttpStatus.OK,
    typeResponse: LoginResponseBody,
  })
  async login(@Body() body: LoginDto) {
    const data: any = await this.authService.login(body);

    const message = 'Login successfully';
    return { message, data };
  }

  @Post('authenticate')
  @FunctionRule({
    code: HttpStatus.OK,
    typeResponse: LoginResponseBody,
  })
  async authenticate(@Req() req: Request & { user: User }) {
    const data = { user: req.user };

    return { message: 'Authenticate successfully', data };
  }

  @Post('refresh')
  @FunctionRule({
    auth: false,
    code: HttpStatus.OK,
    typeResponse: LoginResponseBody,
  })
  async refreshAuth(@Req() req: Request) {
    const data = await this.authService.refreshAuth(req);

    return { message: 'Refresh token successfully', data };
  }
}
