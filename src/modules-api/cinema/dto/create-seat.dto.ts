import { IsInt, IsString, IsOptional } from "class-validator";
export class CreateSeatDto {
    @IsString()
    seatName: string;

    @IsString()
    seatType: string;

    @IsInt()
    screenId: number
}