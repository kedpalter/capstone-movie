import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,

  ) { }


  async findAllMovies() {
    const res = await this.prisma.movies.findMany()
    return res;
  }

  async movieDetail(id: number) {
    const res = await this.prisma.movies.findUnique({
      where: {
        movieId: id
      }
    })
    return res;
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    console.log(createMovieDto)
    const { movieName, movieTrailer, movieImage, movieDescription, dateRelease, movieRating, isTrending, isShowing, isUpcoming } = createMovieDto;
    await this.prisma.movies.create({
      data: {
        movieName,
        movieTrailer,
        movieImage,
        movieDescription,
        dateRelease: new Date(createMovieDto.dateRelease),
        movieRating,
        isTrending,
        isShowing,
        isUpcoming
      }
    })
    return true;
  }

  updateMovie(id: number, updateMovieDto: UpdateMovieDto) {

    return true;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
