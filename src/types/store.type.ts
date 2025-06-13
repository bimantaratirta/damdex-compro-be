import { ApiResponseProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ResponseBody, ResponsePaginateData } from "./core.type";

class StoreResponseData {
    @ApiResponseProperty()
    @Expose()
    id: number;

    @ApiResponseProperty()
    @Expose()
    province: string;

    @ApiResponseProperty()
    @Expose()
    city: string;

    @ApiResponseProperty()
    @Expose()
    storeName: string;

    @ApiResponseProperty()
    @Expose()
    storeAddress: string;

    @ApiResponseProperty()
    @Expose()
    storeAddressGoogleMap: string;
    
    @ApiResponseProperty()
    @Expose()
    storePhone: string;

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

class CityOptionsResponseData {
    @ApiResponseProperty()
    @Expose()
    value: string;

    @ApiResponseProperty()
    @Expose()
    label: string;
}

class ProvinceOptionsResponseData {
    @ApiResponseProperty()
    @Expose()
    value: string;
    
    @ApiResponseProperty()
    @Expose()
    label: string;

    @ApiResponseProperty({ type: [CityOptionsResponseData] })
    @Expose()
    @Type(() => CityOptionsResponseData)
    city: CityOptionsResponseData[];
}

export class PaginateStoreResponseData extends ResponsePaginateData {
    @ApiResponseProperty({ type: [StoreResponseData] })
    @Expose()
    @Type(() => StoreResponseData)
    payload: StoreResponseData;
}
    
export class PaginateStoreResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: PaginateStoreResponseData })
    @Expose()
    @Type(() => PaginateStoreResponseData)
    data?: PaginateStoreResponseData;
}

export class CreateStoreResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: StoreResponseData })
    @Expose()
    @Type(() => StoreResponseData)
    data?: StoreResponseData;
}

export class GetOneStoreResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: StoreResponseData })
    @Expose()
    @Type(() => StoreResponseData)
    data?: StoreResponseData;
}

export class UpdateStoreResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: StoreResponseData })
    @Expose()
    @Type(() => StoreResponseData)
    data?: StoreResponseData;
}

export class ProvinceOptionsResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: [ProvinceOptionsResponseData] })
    @Expose()
    @Type(() => ProvinceOptionsResponseData)
    data?: ProvinceOptionsResponseData[];
}

export class CityOptionsResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: [CityOptionsResponseData] })
    @Expose()
    @Type(() => CityOptionsResponseData)
    data?: CityOptionsResponseData[];
}