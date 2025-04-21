import { ApiResponseProperty } from "@nestjs/swagger";
import { ResponseBody } from "./core.type";
import { Expose, Type } from "class-transformer";

class LoginResponseData {
    @ApiResponseProperty()
    @Expose()
    user: any;

    @ApiResponseProperty()
    @Expose()
    token: string;
}

export class LoginResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: LoginResponseData })
    data: LoginResponseData;
}