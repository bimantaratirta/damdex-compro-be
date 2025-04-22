import { ExceptionFilter, HttpCode, HttpStatus, NestInterceptor, Type, UseFilters, UseGuards, UseInterceptors, applyDecorators } from "@nestjs/common"
import { ApiResponse } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/filters/http-exception.filter";
import { ServerExceptionFilter } from "src/filters/server-exception.filter";
import { AuthGuard } from "src/guards/auth/auth.guard";
import { TransformResponse } from "src/interceptors/transform-response.interceptor";

export type RuleParams = {
    code: HttpStatus;
    auth?: boolean;
    typeResponse?: string | Function | Type<unknown> | [Function];
}

export function FunctionRule(params: RuleParams) {
    const { auth = true } = params;

    const guards = [auth ? AuthGuard : undefined].filter((guard: any) => guard);

    const interceptors: NestInterceptor[] = [
        new TransformResponse(params),
    ];

    const filters: ExceptionFilter[] = [
        new ServerExceptionFilter(),
        new HttpExceptionFilter(params),
    ]

    return applyDecorators(
        HttpCode(params.code),
        UseGuards(...guards),
        UseInterceptors(...interceptors),
        UseFilters(...filters),
        ApiResponse({ status: params.code, type: params.typeResponse }),
    )
}