import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CheckExistService } from 'src/modules-system/checkExist/checkExist.service';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { CreateScreenDto } from './dto/create-screen.dto';
import { CreateSeatDto } from './dto/create-seat.dto';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { queryPrisma } from 'src/common/helpers/queryPrisma.helper';


@Injectable()
export class CinemaService {
  constructor(
    private prisma: PrismaService,
    private isExist: CheckExistService
  ) { }

  async findAllBrands() {
    return this.prisma.brands.findMany()
  }

  async getBrandDetail(brandId: number, page?: number, pageSize?: number) {
    if (!brandId) throw new BadRequestException("brandId is required")
    const { pagePagi, pageSizePagi, index } = queryPrisma(page, pageSize)

    const isBrand = await this.prisma.brands.findUnique({
      where: {
        brandId,
        isDeleted: false
      },
      select: {
        brandId: true,
        brandName: true,
        brandLogo: true,
        Cinemas: {
          skip: index,
          take: pageSizePagi
        }
      }
    })
    if (!isBrand) throw new NotFoundException("Brand Not Found!")
    return {
      ...isBrand,
      page: pagePagi,
      pageSize: pageSizePagi
    };
  }

  async getShowtimeByBrand(brandId: number) {
    if (!brandId) throw new BadRequestException("brandId is required!")
    const isBrand = await this.prisma.brands.findUnique({
      where: { brandId, isDeleted: false },
      select: {
        brandId: true,
        brandName: true,
        brandLogo: true,
        Cinemas: {
          select: {
            cinemaId: true,
            cinemaName: true,
            cinemaAddress: true,
            Screens: {
              select: {
                screenId: true,
                Showtime: {
                  select: {
                    showId: true,
                    movieId: true,
                    showTime: true,
                    bookingPrice: true
                  }
                }
              }
            }
          }
        }
      }
    })
    if (!isBrand) throw new NotFoundException("Brand Not Found!")
    return isBrand
  }

  async getShowtimeByCinema(cinemaId: number) {
    const isCinema = await this.prisma.cinemas.findUnique({
      where: {
        cinemaId,
        isDeleted: false
      },
      select: {
        cinemaId: true,
        cinemaName: true,
        cinemaAddress: true,
        Screens: {
          select: {
            screenId: true,
            screenName: true,
            Showtime: true
          }
        }
      }
    })
    if (!isCinema) throw new NotFoundException("Cinema Not Found!")
    return isCinema
  }

  async getShowtimeByMovie(movieId: number) {
    const isMovie = await this.prisma.movies.findUnique({
      where: {
        movieId,
        isDeleted: false
      },
      select: {
        movieId: true,
        movieName: true,
        Showtime: true
      }
    })
    if (!isMovie) throw new NotFoundException('Movie Not Found!')
    return isMovie
  }

  async getSeats(cinemaId?: number, screenId?: number) {
    if (cinemaId) {
      const isCinema = await this.isExist.checkExist("cinemas", { cinemaId })
      if (!isCinema) throw new NotFoundException("Cinema Not Found!");

      return await this.prisma.cinemas.findUnique({
        where: { cinemaId },
        select: {
          cinemaId: true,
          cinemaName: true,
          cinemaAddress: true,
          Screens: {
            where: { screenId },
            select: {
              screenId: true,
              Seats: true
            }
          }
        }
      })
    }
    return await this.prisma.seats.findMany({
      where: { screenId }
    })
  }

  async addShowtime(addShowtimeDto: CreateShowtimeDto) {
    return await this.prisma.showtime.create({
      data: {
        ...addShowtimeDto,
        showTime: new Date(addShowtimeDto.showTime)
      }
    })
  }

  async updateShowtime(showtimeId: number, updateShowtimeDto: UpdateShowtimeDto) {
    const isShowtime = await this.prisma.showtime.update({
      where: { showId: showtimeId, isDeleted: false },
      data: {
        ...updateShowtimeDto,
        showTime: updateShowtimeDto.showTime ? new Date(updateShowtimeDto.showTime) : undefined
      }
    })
    if (!isShowtime) throw new NotFoundException("Showtime Not Found!")
    return isShowtime
  }

  async deleteShowtime(showtimeId: number) {
    const isShowtime = await this.prisma.showtime.update({
      where: { showId: showtimeId, isDeleted: false },
      data: { isDeleted: true }
    })
    if (!isShowtime) throw new NotFoundException("Showtime Not Found!")
    return isShowtime
  }

  async addCinema(createCinemaDto: CreateCinemaDto) {
    return await this.prisma.cinemas.create({
      data: createCinemaDto
    })
  }

  async findCinemaDetail(cinemaId: number) {
    const res = await this.prisma.cinemas.findUnique({
      where: {
        cinemaId,
      },
      include: {
        Screens: true
      }
    })
    if (!res) throw new NotFoundException("Cinema not found")
    return res
  }

  async updateCinema(cinemaId: number, updateCinemaDto: UpdateCinemaDto) {
    const isExist = await this.isExist.checkExist("cinemas", { cinemaId })
    if (!isExist) throw new BadRequestException("Updating Failed!")

    return await this.prisma.cinemas.update({
      where: {
        cinemaId
      },
      data: updateCinemaDto
    })
  }

  async deleteCinema(cinemaId: number) {
    const isCinema = await this.prisma.cinemas.update({
      where: {
        cinemaId,
        isDeleted: false
      },
      data: {
        isDeleted: true
      }
    })
    if (!isCinema) throw new NotFoundException("Cinema Not Found!")
    return true
  }

  async addScreen(createSceenDto: CreateScreenDto) {
    const isCinema = await this.isExist.checkExist("cinemas", { cinemaId: createSceenDto.cinemaId })
    if (!isCinema) throw new BadRequestException("Bad Request!")
    return await this.prisma.screens.create({
      data: createSceenDto
    })
  }

  async updateScreen(screenId: number, updateScreenDto: UpdateScreenDto) {
    const isScreen = await this.prisma.screens.update({
      where: { screenId, isDeleted: false },
      data: updateScreenDto
    })
    if (!isScreen) throw new NotFoundException("Screen Not Found")
    return isScreen
  }

  async deleteScreen(screenId: number) {
    const isScreen = await this.prisma.screens.update({
      where: { screenId, isDeleted: false },
      data: {
        isDeleted: true
      }
    })
    if (!isScreen) throw new NotFoundException("Screen Not Found")
    return true
  }

  async addSeat(createSeatDto: CreateSeatDto) {
    const isScreen = await this.isExist.checkExist("screens", { screenId: createSeatDto.screenId })
    if (!isScreen) throw new BadRequestException("Add seat Failed!");

    return await this.prisma.seats.create({
      data: createSeatDto
    })
  }

  async deleteSeat(seatId: number) {
    const isSeat = await this.prisma.seats.update({
      where: { seatId, isDeleted: false },
      data: { isDeleted: true }
    })
    if (!isSeat) throw new NotFoundException("Seat Not Found!")
    return true
  }

}
