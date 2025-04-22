import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { RuleParams } from "src/decorators/rule.decorator";
import { ResponseBody } from "src/types/core.type";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly params?: RuleParams) {}
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse<Response>();
      const responseError = JSON.parse(JSON.stringify(exception.getResponse()));
  
      const errorBody: ResponseBody = {
        error: true,
        statusCode: exception.getStatus(),
        message: responseError.message ?? 'Something went wrong. Please try again later!.',
      };
  
      res.status(errorBody.statusCode).json(errorBody);
    }
  }