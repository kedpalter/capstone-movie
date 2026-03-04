import { Length } from "class-validator";
export class ChangePasswordDto {
    oldPassword: string;

    @Length(6, 10, {message: "Password is from 6-10 characters"})
    newPassword: string
}