
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { TokenService } from 'src/modules-system/token/token.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ProtectGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private tokenService: TokenService,
        private prisma: PrismaService

    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        // console.log({ isPublic })
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.tokenService.verifyAccessToken(token);
            const userExist = await this.prisma.users.findUnique({
                where: {
                    userId: (payload as any).userId
                }
            })
            if (!userExist) {
                throw new UnauthorizedException("User Not Found")
            }
            request['user'] = userExist;
        } catch (err) {
            switch (err.constructor) {
                case TokenExpiredError:
                    throw new ForbiddenException(err.message);
                default:
                    throw new UnauthorizedException();
            }
        }
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined
    }
}
