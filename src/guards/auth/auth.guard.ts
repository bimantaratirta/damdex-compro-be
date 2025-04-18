import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import jwtConfig from 'src/config/jwt.config';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context?.switchToHttp().getRequest();
    const token = this.extractToken(req);

    if (!token) {
      throw new BadRequestException('Authentication Failed. There is no credential found');
    }

    try {
      const decodedToken: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: jwtConfig().JWT_SECRET,
      });

      const user = await this.userRepository.findOne({ where: { id: decodedToken.id } });

      if (!user) {
        throw new BadRequestException('User no longer exists');
      }

      req.user = user;

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      } else if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Token invalid');
      } else {
        throw new BadRequestException('Something went wrong. Please try again later');
      }
    }
  }

  private extractToken(request: Request) {
    return request.headers?.authorization?.startsWith('Bearer') ? request.headers?.authorization?.split(' ')[1] : null;
  }
}
