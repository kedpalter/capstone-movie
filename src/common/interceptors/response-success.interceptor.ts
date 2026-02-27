import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"

@Injectable()
export class ResponseSuccessInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const res: Response = context.switchToHttp().getResponse()

        return next
            .handle()
            .pipe(
                map((data) => {
                    return {
                        status: "success",
                        statusCode: res.statusCode,
                        data: data
                    }
                })
            )
    }
}