import { IsInt, IsString } from "class-validator";
export class CreateCinemaDto {
    @IsString()
    cinemaName: string;

    @IsString()
    cinemaAddress: string;

    @IsInt()
    brandId: number
}
