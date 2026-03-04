import { IsEmail, IsString, IsOptional, Length } from "class-validator";
export class CreateUserDto {
    
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
