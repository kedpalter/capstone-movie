import { IsEmail, Length } from "class-validator";


export class LoginDto {
    @IsEmail()
    userEmail: string;
    @Length(6, 10)
    userPassword: string
}