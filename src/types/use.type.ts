import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { UseCompositionResponseData } from "./use-composition.type";
import { ResponseBody, ResponsePaginateData } from "./core.type";

export class UseResponseData {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    heroImage: string;

    @ApiProperty()
    @Expose()
    titleIDN: string;

    @ApiProperty()
    @Expose()
    titleENG: string;

    heroImageUrl?: string;

    @ApiProperty({ type: [UseCompositionResponseData] })
    @Expose()
    @Type(() => UseCompositionResponseData)
    useComposition: UseCompositionResponseData[];
    
    @ApiProperty()
    @Expose()
    createdAt: Date;

    @ApiProperty()
    @Expose()
    updatedAt: Date;

    @ApiProperty()
    @Expose()
    deletedAt: Date | null;
}

export class PaginateUseResponseData extends ResponsePaginateData {
    @ApiProperty({ type: [UseResponseData] })
    @Expose()
    @Type(() => UseResponseData)
    payload: UseResponseData;
}
    
export class PaginateUseResponseBody extends ResponseBody {
    @ApiProperty({ type: PaginateUseResponseData })
    @Expose()
    @Type(() => PaginateUseResponseData)
    data?: PaginateUseResponseData;
}

export class CreateUseResponseBody extends ResponseBody {
    @ApiProperty({ type: UseResponseData })
    @Expose()
    @Type(() => UseResponseData)
    data?: UseResponseData;
}

export class GetOneUseResponseBody extends ResponseBody {
    @ApiProperty({ type: UseResponseData })
    @Expose()
    @Type(() => UseResponseData)
    data?: UseResponseData;
}

export class UpdateUseResponseBody extends ResponseBody {
    @ApiProperty({ type: UseResponseData })
    @Expose()
    @Type(() => UseResponseData)
    data?: UseResponseData;
}

export class UseOptionsResponseBody extends ResponseBody {
    @ApiProperty({ type: [UseResponseData] })
    @Expose()
    @Type(() => UseResponseData)
    data?: UseResponseData[];
}