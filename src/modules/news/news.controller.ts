import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import { FunctionRule } from 'src/decorators/rule.decorator';
import { CreateNewsDto } from './dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateNewsResponseBody, GetOneNewsResponseBody, PaginateNewsResponseBody, UpdateNewsResponseBody } from 'src/types/news.type';
import { UpdateNewsDto } from './dto/update.dto';
import { ResponseBody } from 'src/types/core.type';

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

@ApiTags('News')
@Controller('news')
export class NewsController {
    constructor(
        private newsService: NewsService,
    ) {}

    @Get()
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: PaginateNewsResponseBody
    })
    @ApiQuery({ name: 'page', description: 'to filter the data base on page with a specific limit', type: 'number', example: '1' })
    @ApiQuery({ name: 'limit', description: 'to limit the data to be retrieved (default: 25)', type: 'number', example: '25' })
    async getPaginate(@Req() req: Request) {
        const data = await this.newsService.findPaginate(req);
        const message = 'News retrieved successfully';
        return { data, message };
    }

    @Get(':id')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: GetOneNewsResponseBody
    })
    async getOne(@Param('id') id: string){
        const data = await this.newsService.findOne(id)
        const message: string = 'News retrieved successfully';
        return { data, message };
    }
    
    @Post()
    @FunctionRule({
        code: HttpStatus.CREATED,
        typeResponse: CreateNewsResponseBody
    })
    @UseInterceptors(FileInterceptor('titleImage', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data', 'application/json')
    async create(
        @Body() body: CreateNewsDto,
        @UploadedFile(new ParseFilePipeBuilder().build()) titleImage: Express.Multer.File
    ) {
        if (titleImage) {
            body.titleImage = titleImage;
        }
        const data = await this.newsService.create(body)

        const message: string = 'News created successfully';
        return { data, message };
    }

    @Patch(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: UpdateNewsResponseBody
    })
    @UseInterceptors(FileInterceptor('titleImage', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data', 'application/json')
    async update(
        @Param('id') id: string,
        @Body() body: UpdateNewsDto,
        @UploadedFile() titleImage: Express.Multer.File
    ) {
        if (titleImage) {
            body.titleImage = titleImage;
        }
        const data = await this.newsService.update(id, body)

        const message: string = 'News updated successfully';
        return { data, message };
    }

    @Delete(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: ResponseBody,
    })
    async delete(@Param('id') id: string){
        await this.newsService.delete(id)
        const message: string = 'News deleted successfully';
        return { message };
    }
}
