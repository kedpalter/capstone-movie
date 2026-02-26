import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { CheckExistModule } from 'src/modules-system/checkExist/checkExist.module';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
