import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ProductResponseData } from "./product.type";
import { ResponseBody, ResponsePaginateData } from "./core.type";

export class ProductAdvantageResponseData {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty({ type: () => ProductResponseData })
    @Expose()
    @Type(() => ProductResponseData)
    product: ProductResponseData;

    @ApiProperty()
    @Expose()
    productId: string;

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
}

export class PaginateProductAdvantageResponseData extends ResponsePaginateData {
    @ApiProperty({ type: [ProductAdvantageResponseData] })
    @Expose()
    @Type(() => ProductAdvantageResponseData)
    payload: ProductAdvantageResponseData;
}
    
export class PaginateProductAdvantageResponseBody extends ResponseBody {
    @ApiProperty({ type: PaginateProductAdvantageResponseData })
    @Expose()
    @Type(() => PaginateProductAdvantageResponseData)
    data?: PaginateProductAdvantageResponseData;
}

export class CreateProductAdvantageResponseBody extends ResponseBody {
    @ApiProperty({ type: ProductAdvantageResponseData })
    @Expose()
    @Type(() => ProductAdvantageResponseData)
    data?: ProductAdvantageResponseData;
}

export class GetOneProductAdvantageResponseBody extends ResponseBody {
    @ApiProperty({ type: ProductAdvantageResponseData })
    @Expose()
    @Type(() => ProductAdvantageResponseData)
    data?: ProductAdvantageResponseData;
}

export class UpdateProductAdvantageResponseBody extends ResponseBody {
    @ApiProperty({ type: ProductAdvantageResponseData })
    @Expose()
    @Type(() => ProductAdvantageResponseData)
    data?: ProductAdvantageResponseData;
}