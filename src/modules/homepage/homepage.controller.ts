import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { LanguageEnum, LanguageType } from 'src/types/languange.type';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FunctionRule } from 'src/decorators/rule.decorator';
import { HomepageService } from './homepage.service';
import { CreateOrUpdateHomepageDto } from './dto/create-or-update.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { User } from 'src/entities/user.entity';

const maxFileSize: number = 1 * 1024; // 5 MB
const fileFilterConfig = (
    req: Request & { user: User },
    file: Express.Multer.File,
    callback: (error: Error, acceptFile: boolean) => void,
  ): void => {
    if (file.size > maxFileSize) {
        return callback(new BadRequestException('Max file size is 5 MB'), false)
    }
  
    callback(null, true);
  };

@ApiTags('Homepage')
@Controller('homepage')
export class HomepageController {
    constructor(
        private homepageService: HomepageService,
    ) {}

    @Get()
    @ApiQuery({ name: 'lang', enum: LanguageEnum })
    @ApiQuery({ name: 'section', required: false, type: 'number' })
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
    })
    async get(@Req() req: Request, @Query('lang') lang: LanguageType, @Query('section') section: string) {
        let data: any;
        if (!Object.values(LanguageEnum).includes(lang)) {
            throw new BadRequestException('Invalid language');
        }
        data = await this.homepageService.get(req, lang, Number(section))

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
            { name: 'section2TopLeftImageBackground', maxCount: 1 },
            { name: 'section2TopRightImageBackground', maxCount: 1 },
            { name: 'section2BottomLeftImageBackground', maxCount: 1 },
            { name: 'section2BottomRightImageBackground', maxCount: 1 },
        ],
        {
            storage: memoryStorage(),
            fileFilter: fileFilterConfig,
        })
    )
    async createOrUpdate(
        @Body() body: CreateOrUpdateHomepageDto,
        @UploadedFiles() files: { 
            section1Background?: Express.Multer.File[],
            section1GifImage?: Express.Multer.File[],
            section2TopLeftImageBackground?: Express.Multer.File[],
            section2TopRightImageBackground?: Express.Multer.File[],
            section2BottomLeftImageBackground?: Express.Multer.File[],
            section2BottomRightImageBackground?: Express.Multer.File[],
        }
    ) {
        if (files.section1Background?.[0]) {
            body.section1Background = files.section1Background?.[0];
        }
        if (files.section1GifImage?.[0]) {
            body.section1GifImage = files.section1GifImage?.[0];
        }
        if (files.section2TopLeftImageBackground?.[0]) {
            body.section2TopLeftImageBackground = files.section2TopLeftImageBackground?.[0];
        }
        if (files.section2TopRightImageBackground?.[0]) {
            body.section2TopRightImageBackground = files.section2TopRightImageBackground?.[0];
        }
        if (files.section2BottomLeftImageBackground?.[0]) {
            body.section2BottomLeftImageBackground = files.section2BottomLeftImageBackground?.[0];
        }
        if (files.section2BottomRightImageBackground?.[0]) {
            body.section2BottomRightImageBackground = files.section2BottomRightImageBackground?.[0];
        }
        
        const data = await this.homepageService.createOrUpdate(body);
        const message = 'Homepage content updated successfully';
        return { message, data }
    }
}
