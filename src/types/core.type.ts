import { ApiResponseProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ResponseBody {
  @ApiResponseProperty()
  @Expose()
  error: boolean;
  
  @ApiResponseProperty()
  @Expose()
  errorMessage?: string | null;
  
  @ApiResponseProperty()
  @Expose()
  data: any;
}
