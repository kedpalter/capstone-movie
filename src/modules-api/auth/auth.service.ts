import { Injectable, BadRequestException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { TokenService } from 'src/modules-system/token/token.service';
import { RegisterDto } from './dto/register.dto';

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

        const tokens = this.tokenService.createTokens(userExist.userId, userExist.userType)
        console.log({ userEmail, userPassword, userExist })
        return tokens
    }
}
