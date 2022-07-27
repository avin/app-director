import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';

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
      expiresIn: `10s`,
    });
  }

  async getRefreshTokenForUser(user: User, expiresIn = 3600) {
    const payload: JwtPayload = { userId: user.id };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${expiresIn}s`,
    });
  }
}
