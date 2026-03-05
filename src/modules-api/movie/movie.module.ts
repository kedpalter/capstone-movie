import { Module } from '@nestjs/common';
import { ProtectGuard } from 'src/common/guards/protect.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { AuthModule } from '../auth/auth.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CloudinaryProvider } from 'src/common/cloudinary/cloudinary.provider';

@Module({
  imports: [AuthModule],
  controllers: [MovieController],
  providers: [MovieService, ProtectGuard, RoleGuard, CloudinaryProvider],
  exports: [CloudinaryProvider]
})
export class MovieModule {}
