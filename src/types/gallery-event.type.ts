import { ApiPropertyOptional, ApiResponseProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ResponseBody, ResponsePaginateData } from "./core.type";

export class GalleryEventResponse {
    @ApiResponseProperty()
    @Expose()
    id: number;

    @ApiResponseProperty()
    @Expose()
    heroImage: string;

    @ApiResponseProperty()
    @Expose()
    eventDate: Date;

    @ApiResponseProperty()
    @Expose()
    titleIDN: string;

    @ApiResponseProperty()
    @Expose()
    eventVenueIDN: string;

    @ApiResponseProperty()
    @Expose()
    eventThemeIDN: string;

    @ApiResponseProperty()
    @Expose()
    eventDescriptionIDN: string;

    @ApiResponseProperty()
    @Expose()
    titleENG: string;

    @ApiResponseProperty()
    @Expose()
    eventVenueENG: string;

    @ApiResponseProperty()
    @Expose()
    eventThemeENG: string;

    @ApiResponseProperty()
    @Expose()
    eventDescriptionENG: string;
    
    @ApiPropertyOptional()
    @Expose()
    heroImageUrl?: string;
    
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


export class GalleryEventResponseData extends ResponsePaginateData {
    @ApiResponseProperty({ type: [GalleryEventResponse] })
    @Expose()
    @Type(() => GalleryEventResponse)
    payload: GalleryEventResponse;
}
    
export class PaginateGalleryEventResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: GalleryEventResponseData })
    @Expose()
    @Type(() => GalleryEventResponseData)
    data?: GalleryEventResponseData;
}

export class CreateGalleryEventResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: GalleryEventResponse })
    @Expose()
    @Type(() => GalleryEventResponse)
    data?: GalleryEventResponse;
}

export class GetOneGalleryEventResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: GalleryEventResponse })
    @Expose()
    @Type(() => GalleryEventResponse)
    data?: GalleryEventResponse;
}

export class UpdateGalleryEventResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: GalleryEventResponse })
    @Expose()
    @Type(() => GalleryEventResponse)
    data?: GalleryEventResponse;
}