import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User } from 'src/entities/user.entity';
import { UserResponse } from 'src/types/user.type';
import { formatAllowedField } from 'src/helpers/format-allowed-field';
import jwtConfig from 'src/config/jwt.config';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    const user: User = await this.userRepository.findOne({ where: { email: body.email } });

    if (!user && !this.checkPassword(body.password, user.password)) {
      throw new BadRequestException('Invalid Credentials');
    }

    const token: string = await this.jwtService.signAsync({ id: user.id, email: user.email });

    const userFormatted: UserResponse = formatAllowedField(UserResponse, user);
    return { user: userFormatted, token };
  }

  async refreshAuth(req: Request) {
    const token: string = req.headers?.authorization?.startsWith('Bearer') ? req.headers?.authorization?.split(' ')[1] : null;

    if (!token) {
      throw new BadRequestException('Token should not be empty');
    }

    const decodedToken: JwtPayload = await this.jwtService.verifyAsync(token, {
      secret: jwtConfig().JWT_SECRET,
      ignoreExpiration: true,
    });

    const user: User = await this.userRepository.findOne({ where: { id: decodedToken.id } });

    const newToken: string = await this.jwtService.signAsync({ id: user.id });

    const userFormatted: UserResponse = formatAllowedField(UserResponse, user);
    return { user: userFormatted, token: newToken };
  }

  private async checkPassword(candidatePassword: string, userPassword: string) {
    return await argon2.verify(candidatePassword, userPassword);
  }
}
