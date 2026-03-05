import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ProtectGuard } from './common/guards/protect.guard';
import { RoleGuard } from './common/guards/role.guard';
import { AuthModule } from './modules-api/auth/auth.module';
import { BookingModule } from './modules-api/booking/booking.module';
import { CinemaModule } from './modules-api/cinema/cinema.module';
import { MovieModule } from './modules-api/movie/movie.module';
import { UserModule } from './modules-api/user/user.module';
import { CheckExistModule } from './modules-system/checkExist/checkExist.module';
import { ElasticSearch } from './modules-system/elastic-search/elastic-search.module';
import { PrismaModule } from './modules-system/prisma/prisma.module';
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
    AuthModule,
    ElasticSearch
  ],
  // controllers: [AppController],
  providers: [
    // AppService,
    { provide: APP_GUARD, useClass: ProtectGuard },
    { provide: APP_GUARD, useClass: RoleGuard }
  ],
})
export class AppModule { }
