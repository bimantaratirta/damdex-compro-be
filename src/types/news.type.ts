import { ApiPropertyOptional, ApiResponseProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ResponseBody, ResponsePaginateData } from "./core.type";

class NewsResponseData {
    @ApiResponseProperty()
    @Expose()
    id: number;

    @ApiResponseProperty()
    @Expose()
    titleImage: string;

    @ApiResponseProperty()
    @Expose()
    titleIDN: string;

    @ApiResponseProperty()
    @Expose()
    contentIDN: string;

    @ApiResponseProperty()
    @Expose()
    titleENG: string;

    @ApiResponseProperty()
    @Expose()
    contentENG: string;
    
    @ApiPropertyOptional()
    @Expose()
    titleImageUrl?: string;
    
    @ApiResponseProperty()
    @Expose()
    createdAt: Date;

    @ApiResponseProperty()
    @Expose()
    updatedAt: Date;

    @ApiResponseProperty()
    @Expose()
    deletedAt: Date | null;
}

export class PaginateNewsResponseData extends ResponsePaginateData {
    @ApiResponseProperty({ type: [NewsResponseData] })
    @Expose()
    @Type(() => NewsResponseData)
    payload: NewsResponseData;
}
    
export class PaginateNewsResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: PaginateNewsResponseData })
    @Expose()
    @Type(() => PaginateNewsResponseData)
    data?: PaginateNewsResponseData;
}

export class CreateNewsResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: NewsResponseData })
    @Expose()
    @Type(() => NewsResponseData)
    data?: NewsResponseData;
}

export class GetOneNewsResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: NewsResponseData })
    @Expose()
    @Type(() => NewsResponseData)
    data?: NewsResponseData;
}

export class UpdateNewsResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: NewsResponseData })
    @Expose()
    @Type(() => NewsResponseData)
    data?: NewsResponseData;
}