import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AddBannerDto } from './dto/add-banner.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }


  // GET Movies
  @Get("all-movies")
  findAllMovies() {
    // Phân trang
    return this.movieService.findAllMovies();
  }

  // GET Movie Detail
  @Get(':id')
  movieDetail(
    @Param('id')
    id: string
  ) {
    return this.movieService.movieDetail(+id);
  }

  // POST Add Movie
  @Post('add-movie')
  createMovie(
    @Body()
    createMovieDto: CreateMovieDto
  ) {
    return this.movieService.createMovie(createMovieDto);
  }

  // PUT Update Movie
  @Put(':id')
  updateMovie(
    @Param('id')
    id: string,
    @Body()
    updateMovieDto: UpdateMovieDto
  ) {
    return this.movieService.updateMovie(+id, updateMovieDto);
  }

  // DELETE Delete Movie
  @Delete(':id')
  removeMovie(@Param('id') id: string) {
    return this.movieService.removeMovie(+id);
  }

  // GET Movie Banners
  @Get(':id/banners')
  getMovieBanners(
    @Param('id')
    id: string
  ) {
    return this.movieService.getMovieBanners(+id);
  }

  // POST Add Movie banner
  @Post(':id/add-banner')
  addMovieBanner(
    @Param('id')
    id: string,
    @Body()
    addBannerDto: AddBannerDto
  ) {
    return this.movieService.addMovieBanner(+id, addBannerDto)
  }

  // DELETE Movie Banner
  @Delete('banner/:bannerId')
  removeMovieBanner(
    @Param('bannerId')
    bannerId: string,
  ) {
    return this.movieService.removeMovieBanner(+bannerId)
  }
}
