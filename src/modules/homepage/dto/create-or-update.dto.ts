import { ApiProperty, ApiPropertyOptional, ApiResponseProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";

// class CreateOrUpdateHomepageSection1Dto {
//     @IsOptional()
//     bg
// }

export class CreateOrUpdateHomepageDto {
    @ApiProperty()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    sectionNumber: number;

    @ApiPropertyOptional({ description: 'required if section = 1', type: 'file' })
    @IsOptional()
    section1Background: Express.Multer.File;
    
    @ApiPropertyOptional({ description: 'required if section = 1', type: 'file' })
    @IsOptional()
    section1GifImage: Express.Multer.File;
    
    @ApiPropertyOptional({ description: 'required if section = 1' })
    @IsOptional()
    section1Description: string;
}