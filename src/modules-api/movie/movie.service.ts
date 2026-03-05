import { NotFoundException, Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { CreateBannerDto } from './dto/add-banner.dto';
import { CheckExistService } from 'src/modules-system/checkExist/checkExist.service';
import { queryPrisma } from 'src/common/helpers/queryPrisma.helper';
import { FOLDER_IMAGE } from 'src/common/constant/app.constant';
import { CloudinaryResponse } from 'src/common/cloudinary/cloudinary-response';

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

  async addMovieBanner(banner: Express.Multer.File, createBannerDto: CreateBannerDto) {
    const { movieId } = createBannerDto
    console.log({ movieId, banner })
    const isMovie = await this.prisma.movies.findUnique({ where: { movieId: +movieId } })
    if (!isMovie) throw new NotFoundException("Movie not found")
    if (!banner) throw new BadRequestException("File Not Found!")

    // Upload Cloudinary
    const uploadResult = await new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        folder: FOLDER_IMAGE
      }, (error, uploadResult) => {
        if (error) return reject(error);
        resolve(uploadResult as CloudinaryResponse);
      }).end(banner.buffer)
    });

    // Update DB
    // console.log('cloudinary', uploadResult)
    const resImage = await this.prisma.banners.create({
      data: {
        movieId: +movieId,
        bannerImage: uploadResult.public_id
      }
    })
    return resImage

  }

  async removeMovieBanner(bannerId: number) {
    const isBanner = await this.prisma.banners.findUnique({ where: { bannerId, isDeleted: false } })
    if (!isBanner) throw new NotFoundException("Banner Not Found!")

    await cloudinary.uploader.destroy(isBanner.bannerImage)

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
    const isMovie = await this.prisma.movies.findUnique({ where: { movieId, isDeleted: false } })
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
    const isMovie = await this.prisma.movies.findUnique({ where: { movieId, isDeleted: false } })
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
