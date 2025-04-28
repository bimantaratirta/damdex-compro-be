import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDateString, IsNotEmpty } from "class-validator";
import * as moment from "moment";

export class CreateGalleryEventDto {
    @ApiProperty({ description: 'File image for a hero Image', type: 'file' })
    heroImage: Express.Multer.File;
    
    @ApiProperty()
    @IsNotEmpty()
    titleIDN: string;

    @ApiProperty({ description: `Give a date with format YYYY-MM-DD HH:mm:ss. Use package 'moment' for a better experience`, example: moment().format('YYYY-MM-DD HH:mm:ss') })
    @Transform(({ value }) => {
        return moment(value).toISOString();
    })
    @IsDateString()
    eventDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    eventVenueIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    eventThemeIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    eventDescriptionIDN: string;

    @ApiProperty()
    @IsNotEmpty()
    titleENG: string;

    @ApiProperty()
    @IsNotEmpty()
    eventVenueENG: string;

    @ApiProperty()
    @IsNotEmpty()
    eventThemeENG: string;

    @ApiProperty()
    @IsNotEmpty()
    eventDescriptionENG: string;
}