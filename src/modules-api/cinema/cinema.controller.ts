import { Body, Controller, Get, Param, Post, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/roles.decorator';
import { ProtectGuard } from 'src/common/guards/protect.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { CreateScreenDto } from './dto/create-screen.dto';
import { CreateSeatDto } from './dto/create-seat.dto';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateScreenDto } from './dto/update-screen.dto';

@UseGuards(ProtectGuard, RoleGuard)
@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) { }

  // 1. GET Brands
  @Public()
  @Get('all-brands')
  findAllBrands() {
    return this.cinemaService.findAllBrands();
  }

  // 2. GET Brand Detail (get Cinema By BrandId)
  @Public()
  @Get('')
  getBrandDetail(
    @Query('brandId')
    brandId: string,
    @Query('page')
    page?: string,
    @Query('pageSize')
    pageSize?: string
  ) {
    return this.cinemaService.getBrandDetail(+brandId,
      page ? +page : undefined,
      pageSize ? +pageSize : undefined);
  }

  // 3. GET Showtime By Brand
  @Get('showtimeByBrand')
  @Public()
  getShowtimeByBrand(
    @Query('brandId')
    brandId: string
  ) {
    return this.cinemaService.getShowtimeByBrand(+brandId)
  }

  // 4. GET Showtime By Cinema
  @Get('showtimeByCinema')
  @Public()
  getShowtimeByCinema(
    @Query('cinemaId')
    cinemaId: string
  ) {
    return this.cinemaService.getShowtimeByCinema(+cinemaId)
  }

  // 5. GET Showtime By Movie
  @Get('showtimeByMovie')
  @ApiQuery({name: 'fromDate', required: false})
  @ApiQuery({name: 'toDate', required: false})
  @Public()
  getShowtimeByMovie(
    @Query('movieId')
    movieId: string,
    @Query('fromDate')
    fromDate?: string,
    @Query('toDate')
    toDate?: string,
  ) {
    return this.cinemaService.getShowtimeByMovie(+movieId,
      fromDate ? fromDate : undefined,
      toDate ? toDate : undefined,
    )
  }

  // 6. GET Seat list
  @Get('seat-list')
  @ApiQuery({name: 'cinemaId', required: false})
  @ApiQuery({name: 'screenId', required: false})
  @Public()
  getSeats(
    @Query('cinemaId')
    cinemaId?: string,
    @Query('screenId')
    screenId?: string
  ) {
    return this.cinemaService.getSeats(
      cinemaId ? +cinemaId : undefined,
      screenId ? +screenId : undefined)
  }

  // 7. POST Add Showtime
  @Post('add-showtime')
  @Role('admin')
  addShowtime(
    @Body()
    addShowtimeDto: CreateShowtimeDto
  ) {
    return this.cinemaService.addShowtime(addShowtimeDto)
  }

  // 8. PUT Edit Showtime
  @Put('edit-showtime')
  @Role('admin')
  updateShowtime(
    @Query('showtimeId')
    showtimeId: string,
    @Body()
    updateShowtimeDto: UpdateShowtimeDto
  ) {
    return this.cinemaService.updateShowtime(+showtimeId, updateShowtimeDto)
  }

  // 9. DELETE Showtime
  @Delete('delete-showtime')
  @Role('admin')
  deleteShowtime(
    @Query('showtimeId')
    showtimeId: string
  ) {
    return this.cinemaService.deleteShowtime(+showtimeId)
  }

  // 10. POST Add Cinema
  @Post('add-cinema')
  @Role('admin')
  addCinema(
    @Body()
    createCinemaDto: CreateCinemaDto
  ) {
    return this.cinemaService.addCinema(createCinemaDto);
  }

  // 11. GET Cinema detail
  @Get('detail')
  @Public()
  findCinemaDetail(@Query('cinemaId') cinemaId: string) {
    return this.cinemaService.findCinemaDetail(+cinemaId)
  }

  // 12. PUT Edit Cinema
  @Put('edit-cinema')
  @Role('admin')
  updateCinema(
    @Query('cinemaId')
    id: string,
    @Body()
    updateCinemaDto: UpdateCinemaDto
  ) {
    return this.cinemaService.updateCinema(+id, updateCinemaDto);
  }

  // 13. DELETE Cinema
  @Delete('delete-cinema')
  @Role('admin')
  deleteCinema(
    @Query('cinemaId')
    id: string
  ) {
    return this.cinemaService.deleteCinema(+id)
  }

  // 14. POST Add Screen
  @Post('add-screen')
  @Role('admin')
  addScreen(
    @Body()
    createSceenDto: CreateScreenDto
  ) {
    return this.cinemaService.addScreen(createSceenDto)
  }

  // 15. PUT Edit Screen
  @Put('edit-screen')
  @Role('admin')
  updateScreen(
    @Query('screenId')
    screenId: string,
    @Body()
    updateScreenDto: UpdateScreenDto
  ) {
    return this.cinemaService.updateScreen(+screenId, updateScreenDto)
  }

  // 16. DELETE Screen
  @Delete('delete-screen')
  @Role('admin')
  deleteScreen(
    @Query('screenId')
    screenId: string
  ) {
    return this.cinemaService.deleteScreen(+screenId)
  }

  // 17. POST Add Seat
  @Post('add-seat')
  @Role('admin')
  addSeat(
    @Body()
    createSeatDto: CreateSeatDto
  ) {
    return this.cinemaService.addSeat(createSeatDto)
  }

  // 18. DELETE Seat
  @Delete('delete-seat')
  @Role('admin')
  deleteSeat(
    @Query('seatId')
    seatId: string
  ) {
    return this.cinemaService.deleteSeat(+seatId)
  }

}
