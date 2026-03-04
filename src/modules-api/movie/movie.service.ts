import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { CreateBannerDto } from './dto/add-banner.dto';
import { CheckExistService } from 'src/modules-system/checkExist/checkExist.service';
import { queryPrisma } from 'src/common/helpers/queryPrisma.helper';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
    private isExist: CheckExistService
  ) { }

  async getMovieBanners() {
    return await this.prisma.banners.findMany({
      where: {
        isDeleted: false
      }
    })
  }

  async addMovieBanner(createBannerDto: CreateBannerDto) {
    const isMovie = await this.isExist.checkExist("movies", { movieId: createBannerDto.movieId })
    if (!isMovie) throw new NotFoundException("Movie not found")

    return await this.prisma.banners.create({
      data: createBannerDto
    })
  }

  async removeMovieBanner(bannerId: number) {
    const isBanner = await this.prisma.banners.findUnique({ where: { bannerId, isDeleted: false } })
    if (!isBanner) throw new NotFoundException("Banner Not Found!")
    await this.prisma.banners.update({
      where: {
        bannerId
      },
      data: {
        isDeleted: true
      }
    })
    
    return true;
  }

  async findAllMovies(isShowing?: boolean, isUpcoming?: boolean, isTrending?: boolean, page?: number, pageSize?: number) {
    const { pagePagi, pageSizePagi, index } = queryPrisma(page, pageSize)
    const res = await this.prisma.movies.findMany({
      where: {
        isDeleted: false,
        isShowing,
        isUpcoming,
        isTrending
      },
      skip: index,
      take: pageSizePagi
    })
    return {
      page: pagePagi,
      pageSize: pageSizePagi,
      items: res
    }
  }

  async movieDetail(id: number) {
    const isMovie = await this.prisma.movies.findUnique({
      where: {
        movieId: id,
        isDeleted: false
      },
      include: {
        Banners: true
      }
    })
    if (!isMovie) throw new NotFoundException("Movie not found")
    return isMovie;
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    return await this.prisma.movies.create({
      data: {
        ...createMovieDto,
        dateRelease: new Date(createMovieDto.dateRelease),
      }
    })
  }

  async updateMovie(movieId: number, updateMovieDto: UpdateMovieDto) {
    const isMovie = await this.prisma.movies.findUnique({where: {movieId, isDeleted: false}})
    if (!isMovie) throw new NotFoundException("Movie Not Found")
    const res = await this.prisma.movies.update({
      where: {
        movieId
      },
      data: {
        ...updateMovieDto,
        dateRelease: updateMovieDto.dateRelease ? new Date(updateMovieDto.dateRelease) : undefined
      }
    })
    
    return res;
  }

  async removeMovie(movieId: number) {
    const isMovie = await this.prisma.movies.findUnique({where: {movieId, isDeleted: false}})
    if (!isMovie) throw new NotFoundException("Movie Not Found")
    await this.prisma.movies.update({
      where: {
        movieId
      },
      data: {
        isDeleted: true
      }
    })
    return true;
  }

}
