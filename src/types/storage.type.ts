import { ApiResponseProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ResponseBody } from "./core.type";

class UploadPublicFileResponseData {
    @ApiResponseProperty()
    @Expose()
    publicUrl: string;

    @ApiResponseProperty()
    @Expose()
    path: string;
}

export class UploadPublicFileResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: UploadPublicFileResponseData })
    @Expose()
    @Type(() => UploadPublicFileResponseData)
    data: UploadPublicFileResponseData;
}