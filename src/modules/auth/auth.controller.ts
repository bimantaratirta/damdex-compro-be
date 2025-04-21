import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from '@nestjs/swagger';
import { LoginResponseBody } from 'src/types/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiResponse({ type: LoginResponseBody })
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const data: any = await this.authService.login(body);

    const responseBody: LoginResponseBody = {
      error: false,
      errorMessage: null,
      data,
    };

    return res.json(responseBody);
  }
}
