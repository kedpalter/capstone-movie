import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { CreateScreenDto } from './dto/create-screen.dto';
import { CreateSeatDto } from './dto/create-seat.dto';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) { }

  // GET Brands
  @Get('all-brands')
  findAllBrands() {
    return this.cinemaService.findAllBrands();
  }

  // GET Brand Detail
  @Get('brand')
  getBrandDetail(@Query('name') name: string) {
    return this.cinemaService.getBrandDetail(name);
  }

  // GET Cinemas
  @Get('all-cinemas')
  findAllCinemas() {
    return this.cinemaService.findAllCinemas();
  }

  // GET Cinema detail
  // @Get(':cinemaId')
  // findCinemaDetail(@Param('cinemaId') cinemaId: string) {
  //   return this.cinemaService.findCinemaDetail(+cinemaId)
  // }

  // POST Add Cinema
  @Post('add-cinema')
  addCinema(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemaService.addCinema(createCinemaDto);
  }

  // PUT Edit Cinema
  @Put(':id')
  updateCinema(
    @Param('id')
    id: string,
    @Body()
    updateCinemaDto: UpdateCinemaDto
  ) {
    return this.cinemaService.updateCinema(+id, updateCinemaDto);
  }

  // POST Add Screen
  @Post('add-screen')
  addScreen(
    @Query('cinemaId')
    cinemaId: string,
    @Body()
    createSceenDto: CreateScreenDto
  ) {
    return this.cinemaService.addScreen(+cinemaId, createSceenDto)
  }

  // GET Seat list
  @Get(':id/seat-list')
  getSeats(
    @Param('id')
    cinemaId: string,
    @Query('screenId')
    screenId: string
  ) {
    return this.cinemaService.getSeats(+cinemaId, +screenId)
  }

  // POST Add Seat
  @Post(':id/add-seat')
  addSeat(
    @Param('id')
    cinemaId: string,
    @Query('screenId')
    screenId: string,
    @Body()
    addSeatDto: CreateSeatDto
  ) {
    return this.cinemaService.addSeat(+cinemaId, +screenId, addSeatDto)
  }

  // GET Showtime
  @Get('show-time')
  getShowtime(
    @Query('screenId')
    screenId: string
  ) {
    return this.cinemaService.getShowtime(+screenId)
  }

  // POST Add Showtime
  @Post('add-showtime')
  addShowtime(
    @Body()
    addShowtimeDto: CreateShowtimeDto
  ) {
    return this.cinemaService.addShowtime(addShowtimeDto)
  }

  @Put('edit-showtime')
  updateShowtime(
    @Query('showtimeId')
    showtimeId: string,
    @Body()
    updateShowtimeDto: UpdateShowtimeDto
  ) {
    return this.cinemaService.updateShowtime(+showtimeId, updateShowtimeDto)
  }
}
