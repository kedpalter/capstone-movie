import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './modules-api/movie/movie.module';
import { CinemaModule } from './modules-api/cinema/cinema.module';
import { UserModule } from './modules-api/user/user.module';
import { BookingModule } from './modules-api/booking/booking.module';
import { AuthModule } from './modules-api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules-system/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    MovieModule,
    CinemaModule,
    UserModule,
    BookingModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
