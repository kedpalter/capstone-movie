import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';

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

}
