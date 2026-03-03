import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateBannerDto } from './dto/add-banner.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/decorators/roles.decorator';
import { ProtectGuard } from 'src/common/guards/protect.guard';
import { RoleGuard } from 'src/common/guards/role.guard';

@UseGuards(ProtectGuard, RoleGuard)
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  // 1. GET Movie Banners
  @Get('banners')
  getMovieBanners() {
    return this.movieService.getMovieBanners();
  }

  // 2. POST Add Banner
  @Post('add-banner')
  @Role('admin')
  addMovieBanner(
    @Body()
    createBannerDto: CreateBannerDto
  ) {
    return this.movieService.addMovieBanner(createBannerDto)
  }

  // 3. DELETE Banner
  @Delete('delete-banner')
  @Role('admin')
  removeMovieBanner(
    @Query('bannerId')
    bannerId: string,
  ) {
    return this.movieService.removeMovieBanner(+bannerId)
  }

  // 4. GET Movies
  @Get("all-movies")
  @Public()
  findAllMovies(
    @Query('isShowing')
    isShowing?: string,
    @Query('isUpcoming')
    isUpcoming?: string,
    @Query('isTrending')
    isTrending?: string,
    @Query('page')
    page?: string,
    @Query('pageSize')
    pageSize?: string
  ) {
    return this.movieService.findAllMovies(
      (isShowing == "true") ? true : undefined,
      (isUpcoming == "true") ? true : undefined,
      (isTrending == "true") ? true : undefined,
      page ? +page : undefined,
      pageSize ? +pageSize : undefined);
  }

  // 5. GET Movie Detail
  @Get(':id')
  @Public()
  movieDetail(
    @Param('id')
    id: string
  ) {
    return this.movieService.movieDetail(+id);
  }

  // 6. POST Add Movie
  @Post('add-movie')
  @Role('admin')
  createMovie(
    @Body()
    createMovieDto: CreateMovieDto
  ) {
    return this.movieService.createMovie(createMovieDto);
  }

  // 7. PUT Update Movie
  @Put('edit-movie')
  @Role('admin')
  updateMovie(
    @Query('movieId')
    movieId: string,
    @Body()
    updateMovieDto: UpdateMovieDto
  ) {
    return this.movieService.updateMovie(+movieId, updateMovieDto);
  }

  // 8. DELETE Delete Movie
  @Delete('delete-movie')
  @Role('admin')
  removeMovie(
    @Query('movieId')
    movieId: string
  ) {
    return this.movieService.removeMovie(+movieId);
  }

}
