import { IsInt, IsString, IsOptional, IsBoolean, IsDateString } from "class-validator";
export class CreateMovieDto {
    @IsString()
    movieName: string;

    @IsString()
    @IsOptional()
    movieTrailer: string;

    @IsString()
    @IsOptional()
    movieImage: string;

    @IsString()
    @IsOptional()
    movieDescription: string;

    @IsDateString()
    dateRelease: string;

    @IsInt()
    @IsOptional()
    movieRating: number;

    @IsBoolean()
    @IsOptional()
    isTrending: boolean;

    @IsBoolean()
    isShowing: boolean;

    @IsBoolean()
    isUpcoming: boolean
}
