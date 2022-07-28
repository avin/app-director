import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import JwtRefreshGuard from './jwt-refresh.guard';
import { GetUser } from './get-user.decorator';
import { JwtPayload } from './jwt-payload.interface';

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
    const refreshToken = await this.authService.getRefreshTokenForUser(user, {
      isLongLive: authCredentialsDto.remember,
    });

    response.cookie(
      'Refresh',
      refreshToken,
      this.authService.getRefreshTokenCookieOptions(authCredentialsDto.remember),
    );

    return {
      user,
      accessToken,
    };
  }

  @Get('/refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@GetUser() jwtPayload: JwtPayload & { user: User }, @Res({ passthrough: true }) response: Response) {
    const { user } = jwtPayload;

    const accessToken = await this.authService.getAccessTokenForUser(user);
    const refreshToken = await this.authService.getRefreshTokenForUser(user, { isLongLive: jwtPayload.isLongLive });

    response.cookie('Refresh', refreshToken, this.authService.getRefreshTokenCookieOptions(jwtPayload.isLongLive));

    return {
      accessToken,
      user,
    };
  }

  @Get('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('Refresh', '', {
      ...this.authService.getRefreshTokenCookieOptions(),
      maxAge: 0,
    });
  }
}
