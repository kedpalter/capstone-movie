import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from 'src/modules-system/token/token.module';
import { TokenService } from 'src/modules-system/token/token.service';

@Module({
  imports: [TokenModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [TokenService]
})
export class AuthModule { }
