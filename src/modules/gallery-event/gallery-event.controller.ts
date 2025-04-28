import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GalleryEventService } from './gallery-event.service';
import { CreateGalleryEventDto } from './dto/create.dto';
import { FunctionRule } from 'src/decorators/rule.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CreateGalleryEventResponseBody, GetOneGalleryEventResponseBody, PaginateGalleryEventResponseBody, UpdateGalleryEventResponseBody } from 'src/types/gallery-event.type';
import { Request } from 'express';
import { UpdateGalleryEventDto } from './dto/update.dto';
import { ResponseBody } from 'src/types/core.type';

const maxFileSize: number = 1 * 1024; // 5 MB
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

@ApiTags('Gallery Events')
@Controller('gallery-event')
export class GalleryEventController {
    constructor(
        private galleryEventService: GalleryEventService,
    ) {}

    @Get()
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: PaginateGalleryEventResponseBody
    })
    @ApiQuery({ name: 'page', description: 'to filter the data base on page with a specific limit', type: 'number', example: '1' })
    @ApiQuery({ name: 'limit', description: 'to limit the data to be retrieved (default: 25)', type: 'number', example: '25' })
    async getPaginate(@Req() req: Request) {
        const data = await this.galleryEventService.findPaginate(req);
        const message = 'Gallery events retrieved successfully';
        return { data, message };
    }

    @Get(':id')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: GetOneGalleryEventResponseBody
    })
    async getOne(@Param('id') id: string){
        const data = await this.galleryEventService.findOne(id)
        const message: string = 'Gallery event retrieved successfully';
        return { data, message };
    }
    
    @Post()
    @FunctionRule({
        code: HttpStatus.CREATED,
        typeResponse: CreateGalleryEventResponseBody
    })
    @UseInterceptors(FileInterceptor('heroImage', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data')
    async create(
        @Body() body: CreateGalleryEventDto,
        @UploadedFile(new ParseFilePipeBuilder().build()) heroImage: Express.Multer.File
    ) {
        if (heroImage) {
            body.heroImage = heroImage;
        }

        const data = await this.galleryEventService.create(body)
        const message: string = 'Gallery Event created successfully';
        return { message, data };
    }

    @Patch(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: UpdateGalleryEventResponseBody
    })
    @UseInterceptors(FileInterceptor('heroImage', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data')
    async update(
        @Param('id') id: string,
        @Body() body: UpdateGalleryEventDto,
        @UploadedFile() heroImage: Express.Multer.File
    ) {
        if (heroImage) {
            body.heroImage = heroImage;
        }

        const data = await this.galleryEventService.update(id, body)
        const message: string = 'Gallery Event updated successfully';
        return { message, data };
    }

    @Delete(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: ResponseBody,
    })
    async delete(@Param('id') id: string){
        await this.galleryEventService.delete(id)
        const message: string = 'Gallery event deleted successfully';
        return { message };
    }
}
