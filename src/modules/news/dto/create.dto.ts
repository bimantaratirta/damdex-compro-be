import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateNewsDto {
    @ApiProperty()
    @IsNotEmpty()
    titleIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    contentIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    titleENG: string;

    @ApiProperty()
    @IsNotEmpty()
    contentENG: string;

    @ApiProperty({description: 'file for title image', type: 'file' })
    titleImage: Express.Multer.File;
}