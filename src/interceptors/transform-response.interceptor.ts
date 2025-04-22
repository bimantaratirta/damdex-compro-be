import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { RuleParams } from "src/decorators/rule.decorator";
import { ResponseBody } from "src/types/core.type";

@Injectable()
export class TransformResponse implements NestInterceptor {
    constructor(private params: RuleParams) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map((result) => {
                const responseBody: ResponseBody = {
                    error: false,
                    statusCode: this.params.code,
                    message: result?.message ?? null,
                    data: result?.data ?? null,
                }

                return responseBody;
            })
        );
    }
}