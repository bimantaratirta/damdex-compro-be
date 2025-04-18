import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { ResponseBody } from 'src/types/core.type';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiResponse({ type: ResponseBody })
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const data: any = await this.authService.login(body);

    const responseBody: ResponseBody = {
      error: false,
      errorMessage: null,
      data,
    };

    return res.json(responseBody);
  }
}
