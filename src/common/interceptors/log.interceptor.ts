import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req: Request = context.switchToHttp().getRequest()
        const method = req.method
        const url = req.url
        const ip = req.ip

        console.log({ method, url })

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => console.log(`[${method}] \t ${url} \t ${ip}\nAfter ${Date.now() - now}ms`)),
            );
    }
}
