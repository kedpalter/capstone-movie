import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { TokenModule } from 'src/modules-system/token/token.module';

@Module({
  imports: [TokenModule],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule { }
