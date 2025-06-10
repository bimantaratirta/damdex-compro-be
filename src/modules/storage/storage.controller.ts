import { BadRequestException, Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { memoryStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { FunctionRule } from 'src/decorators/rule.decorator';
import { UploadPublicFileDto } from './dto/upload-public-file.dto';
import { UploadPublicFileResponseBody } from 'src/types/storage.type';

const maxFileSize: number = 5 * 1024 * 1024; // 5 MB
const fileFilterConfig = (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error, acceptFile: boolean) => void,
): void => {
    if (file.size > maxFileSize) {
        return callback(new BadRequestException('Max file size is 5 MB'), false)
    }
  
    callback(null, true);
};

@ApiTags('Storage')
@Controller('storage')
export class StorageController {
    constructor(
        private readonly storageService: StorageService,
    ) {}

    @Post('upload')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: UploadPublicFileResponseBody
    })
    @UseInterceptors(FileInterceptor('image', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data')
    async uploadFile(@Body() body: UploadPublicFileDto, @UploadedFile(new ParseFilePipeBuilder().build()) file: Express.Multer.File) {
        if (file) {
            body.image = file;
        }
        
        const data = await this.storageService.uploadPublicImage(body.image);
        const message: string = 'Image uploaded successfully';
        return { message, data };
    }
}
