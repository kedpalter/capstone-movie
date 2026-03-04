import { IsInt, IsString, IsOptional } from "class-validator";
export class CreateScreenDto {
    @IsString()
    screenName: string;

    @IsInt()
    cinemaId: number
}