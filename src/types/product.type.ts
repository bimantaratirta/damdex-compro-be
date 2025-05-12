import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ProductAdvantageResponseData } from "./product-advantage.type";
import { ResponseBody, ResponsePaginateData } from "./core.type";

export class ProductResponseData {
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
    descriptionIDN: string;

    @ApiProperty()
    @Expose()
    titleENG: string;

    @ApiProperty()
    @Expose()
    descriptionENG: string;
    
    @ApiProperty()
    @Expose()
    heroImageUrl?: string;
    
    @ApiProperty()
    @Expose()
    createdAt: Date;

    @ApiProperty()
    @Expose()
    updatedAt: Date;

    @ApiProperty()
    @Expose()
    deletedAt: Date | null;

    @ApiPropertyOptional({ type: () => [ProductAdvantageResponseData]})
    @Expose()
    @Type(() => ProductAdvantageResponseData)
    productAdvantage?: ProductAdvantageResponseData[];
}

export class PaginateProductResponseData extends ResponsePaginateData {
    @ApiProperty({ type: [ProductResponseData] })
    @Expose()
    @Type(() => ProductResponseData)
    payload: ProductResponseData;
}
    
export class PaginateProductResponseBody extends ResponseBody {
    @ApiProperty({ type: PaginateProductResponseData })
    @Expose()
    @Type(() => PaginateProductResponseData)
    data?: PaginateProductResponseData;
}

export class CreateProductResponseBody extends ResponseBody {
    @ApiProperty({ type: ProductResponseData })
    @Expose()
    @Type(() => ProductResponseData)
    data?: ProductResponseData;
}

export class GetOneProductResponseBody extends ResponseBody {
    @ApiProperty({ type: ProductResponseData })
    @Expose()
    @Type(() => ProductResponseData)
    data?: ProductResponseData;
}

export class UpdateProductResponseBody extends ResponseBody {
    @ApiProperty({ type: ProductResponseData })
    @Expose()
    @Type(() => ProductResponseData)
    data?: ProductResponseData;
}

export class ProductOptionsResponseBody extends ResponseBody {
    @ApiProperty({ type: [ProductResponseData] })
    @Expose()
    @Type(() => ProductResponseData)
    data?: ProductResponseData[];
}