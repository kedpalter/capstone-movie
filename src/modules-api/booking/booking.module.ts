import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TokenModule } from 'src/modules-system/token/token.module';

@Module({
  imports: [TokenModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
