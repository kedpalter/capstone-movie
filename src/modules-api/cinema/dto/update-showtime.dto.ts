import { PartialType } from "@nestjs/mapped-types";
import { CreateShowtimeDto } from "./create-showtime.dto";
import { IsDateString } from "class-validator";
export class UpdateShowtimeDto extends PartialType(CreateShowtimeDto) {
    screenId: number;
    movieId: number;

    @IsDateString()
    showTime: string;
    bookingPrice: number
}