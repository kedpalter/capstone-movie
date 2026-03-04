import { IsInt, IsNotEmpty } from "class-validator";
export class CreateBookingDto {
    @IsInt()
    @IsNotEmpty()
    showId: number;
    
    @IsNotEmpty()
    seatId: number[];
}
