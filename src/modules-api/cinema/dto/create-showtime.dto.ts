import { IsDateString, IsInt } from "class-validator";
export class CreateShowtimeDto {
    @IsInt()
    screenId: number;

    @IsInt()
    movieId: number;

    @IsDateString()
    showTime: string;

    @IsInt()
    bookingPrice: number
}