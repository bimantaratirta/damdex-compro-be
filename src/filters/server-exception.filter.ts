import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ResponseBody } from "src/types/core.type";

@Catch()
export class ServerExceptionFilter implements ExceptionFilter {
    constructor() {}
    catch(exception: Error, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse<Response>();
  
      const statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
      const message: string = exception.message;
      console.log(new Date().toString(), ' : ', exception.stack);
  
      const errorBody: ResponseBody = {
        error: true,
        statusCode,
        message: message ?? 'Something went wrong. Please try again later!.',
      };
  
      res.status(statusCode).json(errorBody);
    }
  }
  