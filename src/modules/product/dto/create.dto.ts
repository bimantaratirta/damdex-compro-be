import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ type: 'file', description: 'Hero image for product'})
    heroImage: Express.Multer.File;

    @ApiProperty()
    @IsNotEmpty()
    titleIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    descriptionIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    titleENG: string;

    @ApiProperty()
    @IsNotEmpty()
    descriptionENG: string;
}

export class CreateProductAdvantageDto {
    @ApiProperty({ type: 'file', description: 'Hero image for product advantage'})
    heroImage: Express.Multer.File;
    
    @ApiProperty()
    @IsNotEmpty()
    productId: string;

    @ApiProperty()
    @IsNotEmpty()
    titleIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    descriptionIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    titleENG: string;

    @ApiProperty()
    @IsNotEmpty()
    descriptionENG: string;
}