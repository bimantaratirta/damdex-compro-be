import { ApiResponseProperty } from "@nestjs/swagger";
import { ResponseBody } from "./core.type";
import { Expose, Type } from "class-transformer";
import { UserResponse } from "./user.type";

class LoginResponseData {
    @ApiResponseProperty({ type: UserResponse })
    @Expose()
    @Type(() => UserResponse)
    user: UserResponse;

    @ApiResponseProperty()
    @Expose()
    token: string;
}

export class LoginResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: LoginResponseData })
    data: LoginResponseData;
}