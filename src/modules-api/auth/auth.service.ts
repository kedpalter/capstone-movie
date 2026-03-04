import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { TokenService } from 'src/modules-system/token/token.service';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtPayload } from 'jsonwebtoken';
import { ChangePasswordDto } from './dto/change-pw.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private tokenService: TokenService
    ) { }

    async register(body: RegisterDto) {
        const { userEmail, userPassword, userFullname, userType } = body
        const userExist = await this.prisma.users.findUnique({
            where: {
                userEmail
            }
        })
        if (userExist) {
            throw new BadRequestException("User existed, please login")
        }

        const hassPassword = bcrypt.hashSync(userPassword, 10)

        await this.prisma.users.create({
            data: {
                userEmail,
                userPassword: hassPassword,
                userFullname,
                userType
            }
        })
        return true
    }

    async login(body: LoginDto) {
        const { userEmail, userPassword } = body;

        const userExist = await this.prisma.users.findUnique({
            where: {
                userEmail
            }
        })

        if (!userExist) {
            throw new BadRequestException("Account Invalid!")
        }

        if (!userExist.userPassword) {
            throw new BadRequestException("Please login by Google to continue")
        }

        const isPassword = bcrypt.compareSync(userPassword, userExist.userPassword)
        if (!isPassword) {
            throw new BadRequestException("Account Invalid!")
        }

        const tokens = this.tokenService.createTokens(userExist.userId, userExist.userType || "")
        console.log({ userEmail, userPassword, userExist })
        return tokens
    }

    async refreshToken(refreshTokenDto: RefreshTokenDto) {
        const { accessToken, refreshToken } = refreshTokenDto

        const decodeAccessToken = this.tokenService.verifyAccessToken(accessToken, { ignoreExpiration: true }) as JwtPayload
        const decodeRefreshToken = this.tokenService.verifyRefreshToken(refreshToken) as JwtPayload
        if (decodeAccessToken.userId !== decodeRefreshToken.userId) throw new UnauthorizedException("Refresh Token Invalid")

        const userExist = await this.prisma.users.findUnique({
            where: { userId: decodeAccessToken.userId }
        });
        if (!userExist) throw new UnauthorizedException("Invalid User!")

        const tokens = this.tokenService.createTokens(userExist.userId, decodeAccessToken.role)

        return tokens
    }

    async changePassword(userId: number, changePwDto: ChangePasswordDto) {
        const { oldPassword, newPassword } = changePwDto
        const userExist = await this.prisma.users.findUnique({ where: { userId } })
        if (!userExist) throw new BadRequestException("User Invalid!")

        const isMatch = bcrypt.compareSync(oldPassword, userExist.userPassword)
        if (!isMatch) throw new BadRequestException("Old Password Incorrect")

        const hassPassword = bcrypt.hashSync(newPassword, 10)
        await this.prisma.users.update({
            where: { userId },
            data: { userPassword: hassPassword }
        })
        return "Password Changed!"
    }
}
