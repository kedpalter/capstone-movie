import { IsInt, IsString } from "class-validator";

export class CreateBannerDto {
    // @IsInt()
    movieId: number;

    // @IsString()
    bannerImage: string
}