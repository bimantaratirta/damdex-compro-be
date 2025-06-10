import { ApiProperty } from "@nestjs/swagger";

export class UploadPublicFileDto {
    @ApiProperty({ description: 'File image', type: 'file' })
    image: Express.Multer.File;
}