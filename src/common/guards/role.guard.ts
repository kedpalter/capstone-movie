
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const requiredRole = this.reflector.getAllAndOverride<string>(ROLE_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (!requiredRole) {
            return true
        }

        const { user } = context.switchToHttp().getRequest();
        // console.log('role from JWT: ', user.userType)
        if (requiredRole.includes(user.userType)) {
            return true
        }

        throw new UnauthorizedException('Permission Denied!')
    }
}
