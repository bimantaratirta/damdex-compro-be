import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User } from 'src/entities/user.entity';

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

    return { user, token };
  }

  private async checkPassword(candidatePassword: string, userPassword: string) {
    return await argon2.verify(candidatePassword, userPassword);
  }
}
