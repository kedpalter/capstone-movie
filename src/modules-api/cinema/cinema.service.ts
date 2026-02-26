import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { CheckExistService } from 'src/modules-system/checkExist/checkExist.service';
import { CreateScreenDto } from './dto/create-screen.dto';
import { CreateSeatDto } from './dto/create-seat.dto';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Injectable()
export class CinemaService {
  constructor(
    private prisma: PrismaService,
    private isExist: CheckExistService
  ) { }

  async findAllBrands() {
    const res = await this.prisma.brands.findMany()
    return res;
  }

  async getBrandDetail(name: string) {
    const res = await this.prisma.brands.findFirst({
      where: {
        brandName: name.toLowerCase()
      },
      include: {
        Cinemas: true
      }
    })
    if (!res) throw new NotFoundException("Brand not found")
    return res;
  }

  async findAllCinemas() {
    const res = await this.prisma.cinemas.findMany()
    return res
  }

  // async findCinemaDetail(cinemaId: number) {
  //   const res = await this.prisma.cinemas.findUnique({
  //     where: {
  //       cinemaId,
  //     },
  //     include: {
  //       Screens: true
  //     }
  //   })
  //   if (!res) throw new NotFoundException("Cinema not found")
  //   return res
  // }

  async addCinema(createCinemaDto: CreateCinemaDto) {
    return await this.prisma.cinemas.create({
      data: createCinemaDto
    })
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

  async addScreen(cinemaId: number, createSceenDto: CreateScreenDto) {
    const isExist = await this.isExist.checkExist("cinemas", { cinemaId })
    if (!isExist) throw new BadRequestException("Add screen Failed!")
    return await this.prisma.screens.create({
      data: {
        screenName: createSceenDto.screenName,
        cinemaId
      }
    })
  }

  async getSeats(cinemaId: number, screenId: number) {
    const isCinema = await this.isExist.checkExist("cinemas", { cinemaId })
    if (!isCinema) throw new NotFoundException("Cinema Not Found!");

    const isScreen = await this.isExist.checkExist("screens", { screenId })
    if (!isScreen) throw new NotFoundException("Screen Not Found!");

    return await this.prisma.cinemas.findUnique({
      where: {
        cinemaId
      },
      include: {
        Screens: {
          where: {
            screenId
          },
          include: {
            Seats: true
          }
        }
      }
    })
  }

  async addSeat(cinemaId: number, screenId: number, addSeatDto: CreateSeatDto) {
    const isCinema = await this.isExist.checkExist("cinemas", { cinemaId })
    if (!isCinema) throw new BadRequestException("Add seat Failed!");

    const isScreen = await this.isExist.checkExist("screens", { screenId })
    if (!isScreen) throw new BadRequestException("Add seat Failed!");

    return await this.prisma.seats.create({
      data: {
        ...addSeatDto,
        screenId
      }
    })
  }

  async getShowtime(screenId: number) {
    const isScreen = await this.isExist.checkExist("screens", { screenId })
    if (!isScreen) throw new NotFoundException("Screen Not Found!");
    return await this.prisma.showtime.findFirst({
      where: {
        screenId: screenId
      },
    })
  }

  async addShowtime(addShowtimeDto: CreateShowtimeDto) {
    // validate slot
    return await this.prisma.showtime.create({
      data: {
        ...addShowtimeDto,
        showTime: new Date(addShowtimeDto.showTime)
      }
    })
  }

  async updateShowtime(showtimeId: number, updateShowtimeDto: UpdateShowtimeDto) {

    return await this.prisma.showtime.update({
      where: { showId: showtimeId },
      data: {
        ...updateShowtimeDto,
        showTime: updateShowtimeDto.showTime ? new Date(updateShowtimeDto.showTime) : undefined
      }
    })
  }

}
