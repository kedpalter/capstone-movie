import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { AddBannerDto } from './dto/add-banner.dto';
import { CheckExistService } from 'src/modules-system/checkExist/checkExist.service';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
    private isExist: CheckExistService
  ) { }


  async findAllMovies() {
    const res = await this.prisma.movies.findMany({
      where: {
        isDeleted: false
      }
    })
    return res;
  }

  async movieDetail(id: number) {
    const res = await this.prisma.movies.findUnique({
      where: {
        movieId: id,
        isDeleted: false
      },
      include: {
        Banners: true
      }
    })
    if (!res) throw new NotFoundException("Movie not found")
    return res;
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    console.log(createMovieDto)
    await this.prisma.movies.create({
      data: {
        ...createMovieDto,
        dateRelease: new Date(createMovieDto.dateRelease),
      }
    })
    return true;
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const isExist = await this.isExist.checkExist("movies", { movieId: id })
    if (!isExist) throw new NotFoundException("Movie not found")

    const newData = await this.prisma.movies.update({
      where: {
        movieId: id
      },
      data: {
        ...updateMovieDto,
        dateRelease: updateMovieDto.dateRelease ? new Date(updateMovieDto.dateRelease) : undefined
      }
    })
    return newData;
  }

  async removeMovie(id: number) {
    const isExist = await this.isExist.checkExist("movies", { movieId: id })
    if (!isExist) throw new NotFoundException("Movie not found")

    await this.prisma.movies.update({
      where: {
        movieId: id
      },
      data: {
        isDeleted: true
      }
    })
    return true;
  }

  async getMovieBanners(id: number) {
    const isExist = await this.isExist.checkExist("movies", { movieId: id })
    if (!isExist) throw new NotFoundException("Movie not found")

    const res = await this.prisma.banners.findMany({
      where: {
        movieId: id,
        isDeleted: false
      }
    })
    return res;
  }

  async addMovieBanner(id: number, payload: AddBannerDto) {
    const isExist = await this.isExist.checkExist("movies", { movieId: id })
    if (!isExist) throw new NotFoundException("Movie not found")

    const { bannerImage } = payload;
    const newData = await this.prisma.banners.create({
      data: {
        movieId: id,
        bannerImage: bannerImage
      }
    })
    return newData;
  }

  async removeMovieBanner(bannerId: number) {
    const isExist = await this.isExist.checkExist("banners", { bannerId })
    if (!isExist) throw new NotFoundException("Banner not found")
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
}
