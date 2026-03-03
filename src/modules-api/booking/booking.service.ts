import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService
  ) { }

  async getAvailSeats(showtimeId: number) {
    const isShowtime = await this.prisma.showtime.findUnique({
      where: { showId: showtimeId },
      select: {
        BookingDetail: true,
        Screens: {
          select: {
            Seats: {
              select: {
                seatId: true,
                seatName: true,
                seatType: true
              }
            }
          }
        }
      }
    })
    if (!isShowtime) throw new NotFoundException("Showtime Not Found!")
    const allSeats = isShowtime?.Screens.Seats
    const arrBooked = isShowtime?.BookingDetail.map(detail => detail.seatId)

    const result = allSeats?.map(seat => ({
      seatId: seat.seatId,
      seatName: seat.seatName,
      seatType: seat.seatType,
      isAvailable: !arrBooked?.includes(seat.seatId)
    }))

    return result
  }

  async bookingMovie(userId: number, createBookingDto: CreateBookingDto) {
    const bookedSeats = (await this.getAvailSeats(createBookingDto.showId)).filter(seat => {
      if (!seat.isAvailable) return seat.seatId
    }).map(seat => seat.seatId)

    for (const seat of createBookingDto.seatId) {
      if (bookedSeats.includes(seat)) throw new BadRequestException("Invalid Seats")
    }

    const newBooking = await this.prisma.booking.create({
      data: {
        userId,
        BookingDetail: {
          create: createBookingDto.seatId.map(seatId => ({
            showId: createBookingDto.showId,
            seatId
          }))
        }
      },
      include: {
        BookingDetail: {
          select: { showId: true, seatId: true }
        }
      }
    })
    return newBooking
  }

  async findBookingList(userId: number) {
    return await this.prisma.booking.findMany({
      where: { userId },
      include: {
        BookingDetail: {
          select: {
            showId: true,
            seatId: true,
            Showtime: {
              select: {
                Movies: { select: { movieName: true } },
                showTime: true
              }
            }
          }
        }
      }
    })
  }
}
