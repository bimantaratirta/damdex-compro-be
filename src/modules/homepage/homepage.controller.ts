import { BadRequestException, Controller, Get, HttpCode, Query, Req, Res } from '@nestjs/common';
import { HomepageIdService } from './services/homepage-id.service';
import { HomepageEngService } from './services/homepage-eng.service';
import { Request, Response } from 'express';
import { LanguageType } from 'src/types/languange.type';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Homepage')
@Controller('homepage')
export class HomepageController {
    constructor(
        private homepageIdService: HomepageIdService,
        private homepageEngService: HomepageEngService,
    ) {}

    @Get()
    @HttpCode(200)
    @ApiQuery({ name: 'lang', description: `Allowed lang eng/id` })
    @ApiQuery({ name: 'section', required: true })
    async get(@Req() req: Request, @Query('lang') lang: LanguageType, @Res() res: Response) {
        let data: any; 
        if (lang == 'eng') {
            // data = this.homepageEngService
        } else if (lang == 'id') {
            data = this.homepageIdService.getContentHomepage(req);
        } else {
            throw new BadRequestException('Please provide the allowed language');
        }

        return res.json(data);
    }
}
