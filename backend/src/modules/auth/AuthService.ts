import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/AuthCredentialsDto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/JwtPayload';
import { UsersService } from '../users/UsersService';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/User';
import { CookieOptions } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.usersService.createUser(authCredentialsDto);
  }

  async getUserByEmailAndPassword(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;

    try {
      const user = await this.usersService.getUserByEmailAndPassword(email, password);
      return user;
    } catch {
      throw new UnauthorizedException('Please check login credentials');
    }
  }

  async getAccessTokenForUser(user: User) {
    const payload: JwtPayload = { userId: user.id };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
    });
  }

  getRefreshTokenCookieOptions = (isLongLive = false): CookieOptions => {
    return {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: isLongLive ? Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) : undefined,
    };
  };

  async getRefreshTokenForUser(user: User, { isLongLive = false } = {}) {
    const payload: JwtPayload = { userId: user.id, isLongLive };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
    });
  }
}
