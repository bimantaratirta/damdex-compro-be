import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { LanguageType } from 'src/types/languange.type';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FunctionRule } from 'src/decorators/rule.decorator';
import { HomepageService } from './homepage.service';
import { CreateOrUpdateHomepageDto } from './dto/create-or-update.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Homepage')
@Controller('homepage')
export class HomepageController {
    constructor(
        private homepageService: HomepageService,
    ) {}

    @Get()
    @ApiQuery({ name: 'lang', description: `Allowed lang eng/id` })
    @ApiQuery({ name: 'section', required: false })
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
    })
    async get(@Req() req: Request, @Query('lang') lang: LanguageType) {
        let data: any;

        const message: string = 'Homepage content retrieved successfully';
        return { message, data };
    }

    @Post()
    @FunctionRule({ code: HttpStatus.OK })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'section1Background', maxCount: 1 },
            { name: 'section1GifImage', maxCount: 1 },
        ])
    )
    @ApiQuery({ name: 'lang', description: `Allowed lang eng/id` })
    async createOrUpdate(
        @Body() body: CreateOrUpdateHomepageDto,
        @Query('lang') lang: LanguageType,
        @UploadedFiles() files: { 
            section1Background?: Express.Multer.File[],
            section1GifImage?: Express.Multer.File[],
        }
    ) {
        if (!lang) {
            throw new BadRequestException('Please provide allowed language');
        }

        if (files.section1Background[0]) {
            body.section1Background = files.section1Background[0];
        }
        if (files.section1GifImage[0]) {
            body.section1GifImage = files.section1GifImage[0];
        }
        
        const data = this.homepageService.createOrUpdate(body, lang);
    }
}
