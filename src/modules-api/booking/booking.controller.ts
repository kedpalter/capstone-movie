import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  // 1. Check Slot
  @Get('avail-seats')
  getAvailSeats(
    @Query('showtimeId')
    showtimeId: string
  ) {
    return this.bookingService.getAvailSeats(+showtimeId)
  }

  // 2. Book tickets
  @Post('buy-tickets')
  bookingMovie(
    @Req()
    req: any,
    @Body()
    createBookingDto: CreateBookingDto
  ) {
    return this.bookingService.bookingMovie(+req.user.userId, createBookingDto);
  }

  // 3. GET Booking List
  @Get('my-tickets')
  findBookingList(
    @Req()
    req: any
  ) {
    return this.bookingService.findBookingList(+req.user.userId);
  }
}
