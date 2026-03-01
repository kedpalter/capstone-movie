import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './modules-api/movie/movie.module';
import { CinemaModule } from './modules-api/cinema/cinema.module';
import { UserModule } from './modules-api/user/user.module';
import { BookingModule } from './modules-api/booking/booking.module';
import { AuthModule } from './modules-api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules-system/prisma/prisma.module';
import { CheckExistModule } from './modules-system/checkExist/checkExist.module';
import { ProtectGuard } from './common/guards/protect.guard';
import { RoleGuard } from './common/guards/role.guard';
import { TokenModule } from './modules-system/token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    TokenModule,
    CheckExistModule,
    MovieModule,
    CinemaModule,
    UserModule,
    BookingModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ProtectGuard },
    { provide: APP_GUARD, useClass: RoleGuard }
  ],
})
export class AppModule { }
