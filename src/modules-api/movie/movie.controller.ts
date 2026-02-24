import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

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
  // GET Movie Banners
  // POST Add Movie banner
  // DELETE Movie Banner



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
