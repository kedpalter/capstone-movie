import { PartialType } from "@nestjs/mapped-types";
import { CreateShowtimeDto } from "./create-showtime.dto";


export class UpdateShowtimeDto extends PartialType(CreateShowtimeDto) {
    screenId: number;
    movieId: number;
    showTime: string;
    bookingPrice: number
}