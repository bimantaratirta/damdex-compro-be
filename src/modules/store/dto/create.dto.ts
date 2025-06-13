import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateStoreDto {
    @ApiProperty()
    @IsNotEmpty()
    province: string;

    @ApiProperty()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    storeName: string;

    @ApiProperty()
    @IsNotEmpty()
    storeAddress: string;

    @ApiProperty()
    @IsNotEmpty()
    storeAddressGoogleMap: string;

    @ApiProperty()
    @IsNotEmpty()
    storePhone: string;
}