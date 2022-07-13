import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.usersService.createUser(authCredentialsDto);
  }

  async singIn(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;

    try {
      const user = await this.usersService.getUserByEmailAndPassword(email, password);

      const payload: JwtPayload = { role: user.role, id: user.id };

      const accessToken = await this.jwtService.sign(payload);
      return {
        accessToken,
        user,
      };
    } catch {
      throw new UnauthorizedException('Please check login credentials');
    }
  }
}
