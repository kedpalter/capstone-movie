import { IsEmail, IsString, Length, IsOptional } from "class-validator";
export class RegisterDto {
    @IsEmail()
    userEmail: string;

    @Length(6, 10, { message: "Password from 6-10 characters" })
    userPassword: string;

    @IsString()
    userFullname: string;

    @IsString()
    @IsOptional()
    userType: string
}