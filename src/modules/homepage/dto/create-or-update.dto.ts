import { ApiProperty, ApiPropertyOptional, ApiResponseProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";
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
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 1)
    @IsNotEmpty()
    section1Description: string;
    // ! Section 1

    // Section 2
    @ApiPropertyOptional({ description: 'required if section = 2' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 2)
    @IsNotEmpty()
    section2TopLeftTitle: string;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 2)
    @IsNotEmpty()
    section2TopLeftDescription: string;

    @ApiPropertyOptional({ description: 'required if section = 2', type: 'file' })
    @IsOptional()
    section2TopLeftImageBackground: Express.Multer.File;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 2)
    @IsNotEmpty()
    section2TopRightTitle: string;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 2)
    @IsNotEmpty()
    section2TopRightDescription: string;

    @ApiPropertyOptional({ description: 'required if section = 2', type: 'file' })
    @IsOptional()
    section2TopRightImageBackground: Express.Multer.File;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 2)
    @IsNotEmpty()
    section2BottomLeftTitle: string;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 2)
    @IsNotEmpty()
    section2BottomLeftDescription: string;

    @ApiPropertyOptional({ description: 'required if section = 2', type: 'file' })
    @IsOptional()
    section2BottomLeftImageBackground: Express.Multer.File;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 2)
    @IsNotEmpty()
    section2BottomRightTitle: string;

    @ApiPropertyOptional({ description: 'required if section = 2' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 2)
    @IsNotEmpty()
    section2BottomRightDescription: string;

    @ApiPropertyOptional({ description: 'required if section = 2', type: 'file' })
    @IsOptional()
    section2BottomRightImageBackground: Express.Multer.File;
    // ! Section 2

    // Section 3
    @ApiPropertyOptional({ description: 'required if section = 3' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 3)
    @IsNotEmpty()
    section3TopLeftTitle: string;
    
    @ApiPropertyOptional({ description: 'required if section = 3' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 3)
    @IsNotEmpty()
    section3TopLeftDescription: string;

    @ApiPropertyOptional({ description: 'required if section = 3' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 3)
    @IsNotEmpty()
    section3CenterTitle: string;

    @ApiPropertyOptional({ description: 'required if section = 3' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 3)
    @IsNotEmpty()
    section3BottomRightTitle: string;
    
    @ApiPropertyOptional({ description: 'required if section = 3' })
    @ValidateIf((obj: CreateOrUpdateHomepageDto) => obj.sectionNumber === 3)
    @IsNotEmpty()
    section3BottomRightDescription: string;
    
    @ApiPropertyOptional({ description: 'required if section = 3', type: 'file' })
    section3ImageBackground: Express.Multer.File;

    @ApiPropertyOptional({ description: 'required if section = 3', type: 'file' })
    section3ImageBackground2: Express.Multer.File;
    // ! Section 3
}