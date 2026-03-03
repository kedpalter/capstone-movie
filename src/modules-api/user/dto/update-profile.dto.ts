import { PartialType } from "@nestjs/mapped-types";

class ProfileDto {
    userFullname: string;
    userEmail: string;
    userPhone: string;
    userType: string
}

export class UpdateProfileDto extends PartialType(ProfileDto) {
    userFullname: string;
    userPhone: string;
    userType: string
}