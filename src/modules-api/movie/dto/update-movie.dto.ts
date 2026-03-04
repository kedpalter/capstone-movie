import { PartialType } from '@nestjs/mapped-types';
import { IsDateString } from "class-validator";
import { CreateMovieDto } from './create-movie.dto';
export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    movieName: string;
    movieTrailer: string;
    movieImage: string;
    movieDescription: string;

    @IsDateString()
    dateRelease: string;
    movieRating: number;
    isTrending: boolean;
    isShowing: boolean;
    isUpcoming: boolean
}
