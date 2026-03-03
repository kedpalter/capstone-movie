import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenModule } from 'src/modules-system/token/token.module';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { ProtectGuard } from 'src/common/guards/protect.guard';
import { RoleGuard } from 'src/common/guards/role.guard';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, ProtectGuard, RoleGuard],
})
export class UserModule {}
