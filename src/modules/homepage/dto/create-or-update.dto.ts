import { ApiProperty, ApiPropertyOptional, ApiResponseProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { LanguageEnum, LanguageType } from "src/types/languange.type";

export class CreateOrUpdateHomepageDto {
    @ApiProperty({ enum: LanguageEnum, enumName: 'languageEnum'})
    @IsNotEmpty()
    @IsEnum(LanguageEnum)
    language: LanguageType;
    
    @ApiProperty()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    sectionNumber: number;

    // Section 1
    @ApiPropertyOptional({ description: 'required if section = 1', type: 'file' })
    @IsOptional()
    section1Background: Express.Multer.File;
    
    @ApiPropertyOptional({ description: 'required if section = 1', type: 'file' })
    @IsOptional()
    section1GifImage: Express.Multer.File;
    
    @ApiPropertyOptional({ description: 'required if section = 1' })
    @IsOptional()
    section1Description: string;
    // ! Section 1

    // Section 2
    @ApiPropertyOptional({ description: 'required if section = 2' })
    @IsOptional()
    section2TopLeftTitle: string;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @IsOptional()
    section2TopLeftDescription: string;

    @ApiPropertyOptional({ description: 'required if section = 2', type: 'file' })
    @IsOptional()
    section2TopLeftImageBackground: Express.Multer.File;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @IsOptional()
    section2TopRightTitle: string;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @IsOptional()
    section2TopRightDescription: string;

    @ApiPropertyOptional({ description: 'required if section = 2', type: 'file' })
    @IsOptional()
    section2TopRightImageBackground: Express.Multer.File;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @IsOptional()
    section2BottomLeftTitle: string;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @IsOptional()
    section2BottomLeftDescription: string;

    @ApiPropertyOptional({ description: 'required if section = 2', type: 'file' })
    @IsOptional()
    section2BottomLeftImageBackground: Express.Multer.File;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @IsOptional()
    section2BottomRightTitle: string;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @IsOptional()
    section2BottomRightDescription: string;

    @ApiPropertyOptional({ description: 'required if section = 2', type: 'file' })
    @IsOptional()
    section2BottomRightImageBackground: Express.Multer.File;
    // ! Section 2
}