import { ApiPropertyOptional, ApiResponseProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { LanguageType } from "./languange.type";
import { ResponseBody } from "./core.type";

export const ContentTypeEnum = {
    IMAGE: 'image',
    TEXT: 'text',
} as const;
  
export type ContentType = (typeof ContentTypeEnum)[keyof typeof ContentTypeEnum];

class HomepageResponse {
    @ApiResponseProperty()
    @Expose()
    id: number;

    @ApiResponseProperty()
    @Expose()
    language: LanguageType;

    @ApiResponseProperty()
    @Expose()
    key: string;

    @ApiResponseProperty({ enum: ContentTypeEnum })
    @Expose()
    contentType: ContentType;

    @ApiResponseProperty()
    @Expose()
    content: string;

    @ApiPropertyOptional()
    @Expose()
    fileUrl: string;

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

export class GetHomepageResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: [HomepageResponse] })
    @Type(() => HomepageResponse)
    data?: HomepageResponse[];
}

export class CreateOrUpdateHomepageResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: [HomepageResponse] })
    @Type(() => HomepageResponse)
    data?: HomepageResponse[];
}