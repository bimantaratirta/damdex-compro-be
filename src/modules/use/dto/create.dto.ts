import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUseDto {
    @ApiProperty({ type: 'file', description: 'Hero image for use'})
    heroImage: Express.Multer.File;

    @ApiProperty()
    @IsNotEmpty()
    titleIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    titleENG: string;    
}

export class CreateUseCompositionDto {
    @ApiProperty()
    @IsNotEmpty()
    useId: number;

    @ApiProperty()
    @IsNotEmpty()
    titleIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    titleENG: string;

    @ApiProperty()
    @IsNotEmpty()
    descriptionIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    descriptionENG: string;
}

export class CreateUseCompositionUseForDto {
    @ApiProperty()
    @IsNotEmpty()
    useCompositionId: string;
    
    @ApiProperty()
    @IsNotEmpty()
    titleIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    titleENG: string;

    @ApiProperty()
    @IsNotEmpty()
    descriptionIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    descriptionENG: string;
}