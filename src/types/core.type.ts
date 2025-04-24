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

export class ResponsePaginateData {
  @ApiResponseProperty()
  @Expose()
  totalAllData: number;

  @ApiResponseProperty()
  @Expose()
  totalData: number;

  @ApiResponseProperty()
  @Expose()
  limit: number;

  @ApiResponseProperty()
  @Expose()
  totalPage: number;

  @ApiResponseProperty()
  @Expose()
  currentPage: number;

  @ApiResponseProperty()
  @Expose()
  lastPage: number;

  @ApiResponseProperty()
  @Expose()
  nextPage: number | null;

  @ApiResponseProperty()
  @Expose()
  previousPage: number | null;

  @ApiResponseProperty()
  @Expose()
  payload: any;
}