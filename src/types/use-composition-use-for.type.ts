import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { UseCompositionResponseData } from "./use-composition.type";
import { ResponseBody } from "./core.type";

export class UseCompositionUseForResponseData {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiPropertyOptional({ type: () => UseCompositionResponseData })
    @Expose()
    @Type(() => UseCompositionResponseData)
    useComposition: UseCompositionResponseData;

    @ApiProperty()
    @Expose()
    useCompositionId: string;

    @ApiProperty()
    @Expose()
    titleIDN: string;

    @ApiProperty()
    @Expose()
    titleENG: string;
    
    @ApiProperty()
    @Expose()
    descriptionIDN: string;

    @ApiProperty()
    @Expose()
    descriptionENG: string;
    
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

export class CreateUseCompositionUseForResponseBody extends ResponseBody {
    @ApiProperty({ type: UseCompositionUseForResponseData })
    @Expose()
    @Type(() => UseCompositionUseForResponseData)
    data?: UseCompositionUseForResponseData;
}

export class GetOneUseCompositionUseForResponseBody extends ResponseBody {
    @ApiProperty({ type: UseCompositionUseForResponseData })
    @Expose()
    @Type(() => UseCompositionUseForResponseData)
    data?: UseCompositionUseForResponseData;
}

export class UpdateUseCompositionUseForResponseBody extends ResponseBody {
    @ApiProperty({ type: UseCompositionUseForResponseData })
    @Expose()
    @Type(() => UseCompositionUseForResponseData)
    data?: UseCompositionUseForResponseData;
}

export class UseCompositionUseForOptionsResponseBody extends ResponseBody {
    @ApiProperty({ type: [UseCompositionUseForResponseData] })
    @Expose()
    @Type(() => UseCompositionUseForResponseData)
    data?: UseCompositionUseForResponseData[];
}