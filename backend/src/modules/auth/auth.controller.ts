import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import JwtRefreshGuard from './jwt-refresh.guard';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.getUserByEmailAndPassword(authCredentialsDto);

    const accessToken = await this.authService.getAccessTokenForUser(user);
    const refreshToken = await this.authService.getRefreshTokenForUser(user);

    response.cookie('Refresh', refreshToken);

    return {
      user,
      accessToken,
    };
  }

  @Get('/refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@GetUser() user: User, @Res({ passthrough: true }) response: Response) {
    const accessToken = await this.authService.getAccessTokenForUser(user);
    const refreshToken = await this.authService.getRefreshTokenForUser(user);

    response.cookie('Refresh', refreshToken);

    return {
      accessToken,
      user,
    };
  }
}
