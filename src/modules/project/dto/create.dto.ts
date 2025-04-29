import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProjectDto {
    @ApiProperty({ type: 'file', description: 'File for hero image'})
    heroImage: Express.Multer.File;

    @ApiProperty()
    @IsNotEmpty()
    titleIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    firstDescriptionIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    secondDescriptionIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    titleENG: string;

    @ApiProperty()
    @IsNotEmpty()
    firstDescriptionENG: string;

    @ApiProperty()
    @IsNotEmpty()
    secondDescriptionENG: string;
}