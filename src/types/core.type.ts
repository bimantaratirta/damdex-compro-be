import { HttpStatus } from "@nestjs/common";
import { ApiResponseProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ResponseBody {
  @ApiResponseProperty()
  @Expose()
  error: boolean;
  
  @ApiResponseProperty()
  @Expose()
  message: string | null;

  @ApiResponseProperty()
  @Expose()
  statusCode: HttpStatus;
  
  @ApiResponseProperty()
  @Expose()
  data?: any;
}
