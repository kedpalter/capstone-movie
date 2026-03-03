import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { CheckExistModule } from 'src/modules-system/checkExist/checkExist.module';
import { AuthModule } from '../auth/auth.module';
import { ProtectGuard } from 'src/common/guards/protect.guard';
import { RoleGuard } from 'src/common/guards/role.guard';

@Module({
  imports: [AuthModule],
  controllers: [MovieController],
  providers: [MovieService, ProtectGuard, RoleGuard],
})
export class MovieModule {}
