import { Controller, Post, Body, Req, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto } from './dto/change-pw.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @Public()
  register(
    @Body()
    body: RegisterDto,
  ) {
    console.log({ body })
    return this.authService.register(body)
  }

  @Post('login')
  @Public()
  login(
    @Body()
    body: LoginDto,
  ) {
    console.log({ body })
    return this.authService.login(body)
  }

  @Post('refresh-token')
  refreshToken(
    @Body()
    refreshTokenDto: RefreshTokenDto
  ) {
    return this.authService.refreshToken(refreshTokenDto)
  }

  @Put('change-password')
  changePassword(
    @Req()
    req: any,
    @Body()
    changePwDto: ChangePasswordDto
  ) {
    return this.authService.changePassword(+req.user.userId, changePwDto)
  }
}
