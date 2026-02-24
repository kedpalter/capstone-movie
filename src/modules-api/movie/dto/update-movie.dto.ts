import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    movieName: string;
    movieTrailer: string;
    movieImage: string;
    movieDescription: string;
    dateRelease: string;
    movieRating: number;
    isTrending: boolean;
    isShowing: boolean;
    isUpcoming: boolean
}
