import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { UseResponseData } from "./use.type";
import { ResponseBody } from "./core.type";
import { UseCompositionUseForResponseData } from "./use-composition-use-for.type";

export class UseCompositionResponseData {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiPropertyOptional({ type: () => UseResponseData })
    @Expose()
    @Type(() => UseResponseData)
    use: UseResponseData;

    @ApiProperty()
    @Expose()
    useId: string;

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

    @ApiProperty({ type: [UseCompositionUseForResponseData] })
    @Expose()
    @Type(() => UseCompositionUseForResponseData)
    useCompositionUseFor: UseCompositionUseForResponseData[];
}

export class CreateUseCompositionResponseBody extends ResponseBody {
    @ApiProperty({ type: UseCompositionResponseData })
    @Expose()
    @Type(() => UseCompositionResponseData)
    data?: UseCompositionResponseData;
}

export class GetOneUseCompositionResponseBody extends ResponseBody {
    @ApiProperty({ type: UseCompositionResponseData })
    @Expose()
    @Type(() => UseCompositionResponseData)
    data?: UseCompositionResponseData;
}

export class UpdateUseCompositionResponseBody extends ResponseBody {
    @ApiProperty({ type: UseCompositionResponseData })
    @Expose()
    @Type(() => UseCompositionResponseData)
    data?: UseCompositionResponseData;
}

export class UseCompositionOptionsResponseBody extends ResponseBody {
    @ApiProperty({ type: [UseCompositionResponseData] })
    @Expose()
    @Type(() => UseCompositionResponseData)
    data?: UseCompositionResponseData[];
}