import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

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

    @ApiPropertyOptional()
    @IsOptional()
    storeAddressGoogleMap: string;

    @ApiProperty()
    @IsNotEmpty()
    storePhone: string;

    @ApiProperty()
    @IsNotEmpty()
    latitude: string;

    @ApiProperty()
    @IsNotEmpty()
    longitude: string;
}